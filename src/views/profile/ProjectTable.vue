<template>
    <n-card hoverable title="我的项目列表" >
         <template #header-extra>
             <el-button
                    type="warning" plain
                    icon="el-icon-plus"
                    class="handle-del mr10"
                    @click="AddNewProject"
                >添加新项目</el-button>
               
                <el-input v-model="query.name" placeholder="请输入项目名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
         </template>
        <div class="container">
            
            <el-table
                :data="tableDate"
                border
                class="table"
                ref="multipleTable"
                :row-class-name="tableRowClassName"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"

            >
                <el-table-column  row-class-name='warning-row' type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
                <el-table-column prop="jindu" label="项目进度"  align="center">
                    <template #default='scope'>
                        {{scope.row.jindu === 6 ? '项目已完成' : scope.row.jindu}}
                    </template>
                </el-table-column>
<!--                <el-table-column label="账户余额">-->
<!--                    <template #default="scope">￥{{ scope.row.money }}</template>-->
<!--                </el-table-column>-->
                
                <el-table-column prop="content" label="项目内容简介" align="center" ></el-table-column>
                <el-table-column label="项目完成情况" align="center">
                    <template #default="scope">
                        <el-tag
                            :type="
                                scope.row.state === '已完成'
                                    ? 'success'
                                    : scope.row.state === '未完成'
                                    ? 'danger'
                                    : ''
                            "
                        >{{ scope.row.state }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="项目开始时间" align="center">
                    <template #default="scope">
                        {{scope.row.beginDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="endDate" label="项目交付时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目简介">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </n-card>
    <n-drawer v-model:show="active" :width="502">
    <n-drawer-content>
        <template #header>
            新增我参与的项目
        </template>
        <div>
            <add-form @closemodal='close' ></add-form>
        </div>
        <template #footer>
            <n-button @click="close">关闭</n-button>
        </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script>
import {ref,onMounted, inject} from 'vue'
import AddForm from './AddForm.vue'
import yhRequest from '../../utils/yhRequest'
import { ElMessage } from 'element-plus'
export default {
    name: "basetable",
    components : {
        AddForm
    },
    setup(props,context) {

        const tableDate = ref(null)
        const getProject = () => {
            yhRequest.get(`/api/project/queryByUserId/${localStorage.getItem('USERID')}`).then(res => {
                tableDate.value = res
            })
        }
        onMounted(() => {
            getProject()
        })
        // APP REFRSH
        const refreash = inject('reload')
        
        const tableRowClassName = ({row, rowIndex,}) => {
                if (rowIndex === 1) {
                    return 'warning-row'
                } else if (rowIndex === 3) {
                    return 'success-row'
                } else if (rowIndex === 5) {
                    return 'green-row'
                }
            return ''
        }
        const active = ref(false)
        const activate = () => {
            active.value = true
        }
        const close = (payload) => {
                if(payload === 200 ) {
                    ElMessage({
                        type: 'success',
                        message: '添加项目成功！'
                    })
                    // getProject()
                    // active.value = false
                    // console.log(payload)
                    // refreash()
                    // context.emit('refresh', true)
                    refreash()
                }
        } 
        return {
            tableRowClassName,
            tableDate,
            active,
            activate,
            close
        } 
    },
    data() {
        return {
            query: {
                address: "",
                name: "",
                pageIndex: 1,
                pageSize: 10
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    inject:['reload'],

    methods: {
        // 触发搜索按钮
       
        handleSearch() {
            this.$set(this.query, "pageIndex", 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index,item) {
            // 二次确认删除
            
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.$yhRequest.delete(`/api/project/delete/${item.id}`).then(res => {
                        this.$yhRequest.get(`/api/project/queryByUserId/${localStorage.getItem('USERID')}`).then(res => {
                            this.tableDate = res
                        })
                    })
                    this.$message.success("删除成功");
                    this.reload()
                    this.tableData.splice(index, 1);
                    
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        AddNewProject() {
            this.active = true
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
            console.log(row.name+"````````"+index);
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$yhRequest.put('/api/project/update', this.form).then(res => {
                console.log(res)
                this.$message.success(`修改项目信息成功`);
            })
        },
        // 分页导航
        handlePageChange(val) {

        }
    }
};
</script>

<style scoped>


.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}


</style>
