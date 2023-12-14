<!--
 * @Date: 2023-12-08 09:10:02
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-08 13:38:52
 * @descript: 文件描述
-->
<template>
	<div class="pageContain">
		<div class="searchCon">
			<el-form inline label-width="80px" size="small">
				<el-form-item label="搜索">
					<el-input
						v-model="pageInfo.keyword"
						style="width: 150px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
				<el-form-item label="地区">
					<el-select
						v-model="pageInfo.country"
						style="width: 150px"
						placeholder="请选择"
					>
						<el-option value="beijing">北京</el-option>
						<el-option value="London">伦敦</el-option>
						<el-option value="Sydney">悉尼</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker
						type="date"
						v-model="pageInfo.date"
						style="width: 150px"
						placeholder="请选择日期"
					></el-date-picker>
				</el-form-item>
				<el-form-item label=" ">
					<el-button type="primary" @click="lookup">查询</el-button>
					<el-button type="success" @click="toAdd" class="ml10"
						>新增</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<el-table
				:data="tableList"
				max-height="600"
				style="width: 100%"
				size="small"
				:border="true"
				stripe
			>
				<el-table-column label="#" type="index"> </el-table-column>
				<el-table-column label="Name" prop="name"> </el-table-column>
				<el-table-column label="Age" prop="age"> </el-table-column>
				<el-table-column label="日期" prop="date"> </el-table-column>
				<el-table-column label="国家" prop="country"> </el-table-column>
				<el-table-column
					label="操作"
					prop="operation"
					align="center"
					width="180"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="warning"
							@click="toEdit(scope.row)"
							>编辑</el-button
						>
						<el-button
							size="mini"
							type="danger"
							@click="toDel(scope.row, scope.$index)"
							>删除</el-button
						>
						<el-popconfirm
							title="确认要删除这一项吗?"
							placement="left"
							@confirm="toDel"
						>
							<i
								slot="reference"
								class="el-icon-delete"
								style="
									cursor: pointer;
									margin-left: 10px;
									font-size: 16px;
									color: red;
								"
							></i>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog
			title="Title"
			:visible="showPageModal"
			width="1000px"
			top="43px"
            v-dialogDrag = "{a:'1223'}"
		>
			<el-form
				:model="pageForm"
				:rules="pageFormRule"
				label-width="80px"
				ref="pageForm"
				size="small"
				inline
			>
				<el-form-item prop="name" label="名字">
					<el-input
						v-model="pageForm.name"
						style="width: 200px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
				<el-form-item prop="country" label="地区">
					<el-select
						v-model="pageForm.country"
						style="width: 200px"
						placeholder="请选择"
					>
						<el-option value="beijing">北京</el-option>
						<el-option value="London">伦敦</el-option>
						<el-option value="Sydney">悉尼</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="date" label="日期">
					<el-date-picker
						type="date"
						v-model="pageForm.date"
						style="width: 200px"
						placeholder="请选择日期"
					></el-date-picker>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<Button @click="showPageModal = false">关闭</Button>
				<Button
					@click="confirmPage"
					type="primary"
					:loading="confirmLoading"
                    class="ml10"
					>确定</Button
				>
			</template>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				pageIndex: 1,
				pageSize: 10,
				user: "",
				password: "",
			},
			tableList: [],
			tableLoading: false,
			showPageModal: false,
			confirmLoading: false,
			pageForm: {},
			pageFormRule: {
				name: {
					required: true,
					message: "请输入",
					trigger: "blur",
				},
				country: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
					},
				],
			},
		};
	},
	created() {
		this.initial();
	},
	mounted() {},
	methods: {
		initial() {
			this.lookup();
		},
		lookup() {
			this.pageInfo.ppageIndex = 1;
			this.getTableList();
		},
		getTableList() {
			this.tableList = [
				{
					name: "Jim Green",
					age: 24,
					country: "London",
					date: "2016-10-01",
				},
				{
					name: "Joe Black",
					age: 30,
					country: "Sydney",
					date: "2016-10-02",
				},
				{
					name: "John Brown",
					age: 18,
					country: "beijing",
					date: "2016-10-03",
				},
				{
					name: "Jon Snow",
					age: 26,
					country: "London",
					date: "2016-10-04",
				},
			];
		},
		toAdd() {
			this.showPageModal = true;
			this.$refs.pageForm && this.$refs.pageForm.resetFields();
			this.pageForm = {
				id: null,
				name: "",
				country: "",
				date: new Date(),
			};
		},
		toEdit(r) {
			console.log(r);
			this.showPageModal = true;
			this.$refs.pageForm && this.$refs.pageForm.resetFields();
			this.pageForm = {
				id: 2,
				...r,
			};
		},
		confirmPage() {
			this.$refs.pageForm.validate((valid) => {
				if (valid) {
					const params = {
						...this.pageForm,
					};
					if (this.pageForm.id) {
						this.edit(params);
					} else {
						this.add(params);
					}
				} else {
					console.log("验证失败");
					console.log(this.pageForm);
				}
			});
		},

		add(params) {
			this.confirmLoading = true;
			setTimeout(() => {
				this.$Message.success("新增成功!");
				this.confirmLoading = false;
				this.showPageModal = false;
				this.getTableList();
			}, 1000);
		},
		edit(params) {
			this.confirmLoading = true;
			setTimeout(() => {
				this.$Message.success("编辑成功!");
				this.confirmLoading = false;
				this.showPageModal = false;
				this.getTableList();
			}, 1000);
		},
		toDel(r) {
			this.$Modal.confirm({
				title: "提示",
				content: "<p>确认要删除该数据吗？</p>",
				onOk: () => {
					setTimeout(() => {
						this.$Message.success("删除成功!");
						this.getTableList();
					}, 1000);
				},
			});
		},
	},
};
</script>
