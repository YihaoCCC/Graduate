<template>
	<div>
		<el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm">
			<el-form-item prop="name">
				<el-input
					v-model="dataForm.name"
					class="input"
					placeholder="姓名"
					size="medium"
					:disabled="!isAuth(['ROOT', 'LEAVE:SELECT'])"
					clearable="clearable"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-select
					v-model="dataForm.deptId"
					class="input"
					placeholder="部门"
					size="medium"
					:disabled="!isAuth(['ROOT', 'LEAVE:SELECT'])"
					clearable="clearable"
				>
					<el-option v-for="one in deptList" :key="one.id" :label="one.deptName" :value="one.id" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-date-picker
					v-model="dataForm.date"
					style="width: 160px;"
					type="date"
					size="medium"
					placeholder="请假日期"
					clearable="clearable"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-select v-model="dataForm.type" class="input" placeholder="类型" size="medium" clearable="clearable">
					<el-option label="病假" value="1"></el-option>
					<el-option label="事假" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select
					v-model="dataForm.status"
					class="input"
					placeholder="状态"
					size="medium"
					clearable="clearable"
				>
					<el-option label="请假中" value="1"></el-option>
					<el-option label="不同意" value="2"></el-option>
					<el-option label="已同意" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="searchHandle()" type="primary" size="medium">查询</el-button>
			</el-form-item>
			<el-form-item >
				<button class="MyButton" @click="addHandle">
					<div class="svg-wrapper-1">
						<div class="svg-wrapper">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
						</svg>
						</div>
					</div>
					<span>我要请假
					</span>
				</button>
				<!-- <el-button type="primary" @click="addHandle()">test</el-button> -->

			</el-form-item>
		</el-form>
		<el-table
			:data="dataList"
			border="border"
			v-loading="dataListLoading"
			cell-style="padding: 4px 0"
			style="width: 100%;"
			size="medium"
		>
			<el-table-column width="40px" prop="reason" header-align="center" align="center" type="expand">
				<template #default="scope">
					请假原因：{{ scope.row.reason }}
				</template>
			</el-table-column>
			<el-table-column type="index" header-align="center" align="center" width="100" label="序号">
				<template #default="scope">
					<span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="name"
				header-align="center"
				align="center"
				label="姓名"
				min-width="150"
			></el-table-column>
			<el-table-column
				prop="deptName"
				header-align="center"
				align="center"
				label="部门"
				min-width="150"
			></el-table-column>
			<el-table-column
				prop="start"
				header-align="center"
				align="center"
				label="起始"
				min-width="180"
			></el-table-column>
			<el-table-column
				prop="end"
				header-align="center"
				align="center"
				label="截止"
				min-width="180"
			></el-table-column>
			<el-table-column
				prop="type"
				header-align="center"
				align="center"
				label="请假类型"
				min-width="150"
			></el-table-column>
			<el-table-column prop="status" header-align="center" align="center" label="请假状态" min-width="120">
				<template #default="scope">
					<el-tag :type="scope.row.status === '请假中' ? 'warning': scope.row.status === '已同意'?  'success':'danger'">{{ scope.row.status }}</el-tag>
					
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" width="120" label="请假单" min-width="120">
				<template #default="scope">
					<el-button
						type="text"
						size="medium"
						v-if="scope.row.status == '已同意'"
						@click="pdfHandle(scope.row.id)"
					>
						请假单
					</el-button>
					<el-tag  v-else class="ml-2" type="info">暂无</el-tag>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" width="150" label="操作" min-width="120">
				<template #default="scope">
					<el-button
						type="text"
						size="medium"
						:disabled="scope.row.status == '已同意' || scope.row.mine != true"
						@click="deleteHandle(scope.row.id)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
			:current-page="pageIndex"
			:page-sizes="[10, 20, 50]"
			:page-size="pageSize"
			:total="totalCount"
			layout="total, sizes, prev, pager, next, jumper"
		></el-pagination>
		<leave-add v-if="addVisible" ref="add" @refreshDataList="loadDataList"></leave-add>
		<leave-pdf v-if="pdfVisible" ref="pdf" @refreshDataList="loadDataList"></leave-pdf>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import LeaveAdd from './leave-add.vue';
import LeavePdf from './leave_pdf.vue';
import { onMounted } from 'vue';
export default {
	components: { LeaveAdd, LeavePdf },
	mounted() {
		this.searchHandle()
	},
	data: function() {
		return {
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			dataForm: {
				name: null,
				deptId: null,
				date: null,
				type: null,
				status: null
			},
			dataList: [],
			deptList: [],
			addVisible: false,
			pdfVisible: false,
			dataRule: {
				name: [{ required: false, pattern: '^[\u4e00-\u9fa5]{1,10}$', message: '姓名格式错误' }]
			}
		};
	},
	methods: {
		loadDeptList: function() {
			let that = this;
			that.$http('dept/searchAllDept', 'GET', null, true, function(resp) {
				that.deptList = resp.list;
			});
		},
		loadDataList: function() {
			let that = this;
			that.dataListLoading = true;
			let data = {
				name: that.dataForm.name,
				deptId: that.dataForm.deptId,
				date: that.dataForm.date,
				type: that.dataForm.type,
				status: that.dataForm.status,
				page: that.pageIndex,
				length: that.pageSize
			};
			if (that.dataForm.date != null && that.dataForm.date != '') {
				data.date = dayjs(that.dataForm.date).format('YYYY-MM-DD');
			}
			that.$http('leave/searchLeaveByPage', 'POST', data, true, function(resp) {
				let page = resp.page;
				for (let one of page.list) {
					if (one.type == 1) {
						one.type = '病假';
					} else if (one.type == 2) {
						one.type = '事假';
					}
					if (one.status == 1) {
						one.status = '请假中';
					} else if (one.status == 2) {
						one.status = '不同意';
					} else if (one.status == 3) {
						one.status = '已同意';
					}
				}
				that.dataList = page.list;
				that.totalCount = page.totalCount;
				that.dataListLoading = false;
			});
		},
		sizeChangeHandle: function(val) {
			this.pageSize = val;
			this.pageIndex = 1;
			this.loadDataList();
		},
		currentChangeHandle: function(val) {
			this.pageIndex = val;
			this.loadDataList();
		},
		searchHandle: function() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					this.$refs['dataForm'].clearValidate();
					if (this.dataForm.name == '') {
						this.dataForm.name = null;
					}
					if (this.pageIndex != 1) {
						this.pageIndex = 1;
					}
					this.loadDataList();
				} else {
					return false;
				}
			});
		},
		addHandle: function(e) {
			e.preventDefault()
			this.addVisible = true;
			this.$nextTick(() => {
				this.$refs.add.init();
			});
		},
		deleteHandle: function(id) {
			let that = this;
			that.$confirm(`确定要删除选中的记录？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let data = {
					id: id
				};
				that.$http('leave/deleteLeaveById', 'POST', data, true, function(resp) {
					if (resp.rows > 0) {
						that.$message({
							message: '操作成功',
							type: 'success',
							duration: 1200
						});
						that.loadDataList();
					} else {
						that.$message({
							message: '未能删除记录',
							type: 'warning',
							duration: 1200
						});
					}
				});
			});
		},
		pdfHandle:function(id){
			this.pdfVisible=true
			this.$nextTick(()=>{
				this.$refs.pdf.init(id)
			})
		}
	},
		function() {
		this.loadDeptList();
		this.loadDataList();
	}
};
</script>

<style lang="less" scoped=""></style>
