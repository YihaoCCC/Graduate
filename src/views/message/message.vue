<template>
    <n-card style="border-radius: 20px">
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`系统消息(${sysMessage.length})`" name="first">
                    <el-table :data="sysMessage" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">
                                    <em>{{`【${scope.row.type}】`}}</em>
                                    {{scope.row.message}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" width="180"></el-table-column>
                        <el-table-column width="160">
                            <template #default="scope">
                                <el-button  :disabled="!isAuth(['ROOT'])"  type="warning" size="small" @click="editItem(scope.row)">修改此公告</el-button>
                                <el-button  :disabled="!isAuth(['ROOT'])"  type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                     
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" :disabled="!isAuth(['ROOT'])" @click="addMessageAction" >添加公告</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`通知消息(${manMessage.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="manMessage" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title"><em>{{`【${scope.row.type}】`}}</em>{{scope.row.message}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="time" width="180"></el-table-column>
                            <el-table-column width="160">
                                <template #default="scope">
                                    <el-button  :disabled="!isAuth(['ROOT'])"  type="warning" size="small" @click="editItem(scope.row)">修改此公告</el-button>
                                    <el-button  :disabled="!isAuth(['ROOT'])"  type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                           
                        </div>
                    </template>
                </el-tab-pane>
             
            </el-tabs>
        </div>
        <el-dialog v-model="dialogFormVisible" title="添加公告">
            <el-form :model="form">
            <el-form-item label="公告内容" :label-width="formLabelWidth">
                <el-input v-model="form.message" type="textarea" autocomplete="off" />
            </el-form-item>
            <el-form-item label="公告类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择公告类型">
                <el-option label="系统公告" value="系统公告" />
                <el-option label="普通消息" value="普通消息" />
                </el-select>
            </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeModel">取消</el-button>
                <el-button type="primary"  v-if="isEdit" @click="confirmEdit" > 修改公告</el-button>
                <el-button v-else type="primary" @click="confirmAdd"
                >添加公告</el-button
                >
            </span>
            </template>
        </el-dialog>
    </n-card>
    
</template>

<script>
import  { ref, onMounted, reactive } from 'vue'
import { getMessage, addMessage, deleteMessage, updateMessage } from './MessageHttp'
import { ElNotification } from 'element-plus'
export default {
        setup() {
            const dialogFormVisible = ref(false)
            const sysMessage = ref([])
            const manMessage = ref([])
            const isEdit = ref(false)
            let form = reactive({
                message: '',
                type: ''
            })
            onMounted(() => {
               freshDate()
            })
            const closeModel = () => {
                dialogFormVisible.value = false
                        form.message = ''
                        form.type = ''
            }
            const freshDate = () => {
                 getMessage().then((res) => {
                    sysMessage.value = []
                    manMessage.value = []
                    res.map((item) => {
                        if(item.type === '系统公告') {
                            sysMessage.value.push(item)
                        } else {
                            manMessage.value.push(item)
                        }
                    })
                })
            }
            const addMessageAction = () => {
                dialogFormVisible.value = true
                isEdit.value = false
            }
            const confirmAdd = () => {
                addMessage(form).then((res) => {
                    if(res.code === 200) {
                        ElNotification({
                            title: res.message,
                            type: 'success',
                        })
                        freshDate()
                        closeModel()
                    }
                })
            }
            const deleteItem = (id) => {
                deleteMessage(id).then((res) => {
                    if(res.code === 200) {
                        ElNotification({
                            title: res.message,
                            type: 'success',
                        })
                        freshDate()
                    }
                })
            }
            const editItem = (item) => {
                dialogFormVisible.value = true
                isEdit.value = true
                form.message = item.message
                form.type = item.type
                form.id = item.id
            }
            const confirmEdit = () => {
                updateMessage(form).then((res) => {
                    if(res.code === 200) {
                        ElNotification({
                            title: res.message,
                            type: 'success',
                        })
                        freshDate()
                        closeModel()
                    }
                })
            }
            return { 
                sysMessage,
                manMessage,
                isEdit,
                closeModel,
                deleteItem,
                addMessageAction,
                confirmAdd,
                editItem,
                confirmEdit,
                dialogFormVisible,
                form,
            }
        },
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
            }
        },
        methods: {
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            }
        },
        computed: {
            unreadNum(){
                return this.sysMessage.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
    text-align: right;
}
</style>

