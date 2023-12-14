<template>
	<div class="pageContain">
        <p class="pageTitle">用户管理</p>
		<div class="searchCon">
			<Form inline :label-width="80">
				<FormItem label="搜索">
					<Input
						type="text"
						v-model="pageInfo.keyword"
						style="width: 150px"
						placeholder="请输入"
					>
					</Input>
				</FormItem>
				<FormItem label="地区">
					<Select
						v-model="pageInfo.country"
						style="width: 150px"
						placeholder="请选择"
					>
						<Option value="beijing">北京</Option>
						<Option value="London">伦敦</Option>
						<Option value="Sydney">悉尼</Option>
					</Select>
				</FormItem>
				<FormItem label="日期">
					<DatePicker
						type="date"
						v-model="pageInfo.date"
						style="width: 150px"
						placeholder="请选择日期"
					></DatePicker>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="lookup">查询</Button>
					<Button type="success" @click="toAdd" class="ml10"
						>新增</Button
					>
				</FormItem>
			</Form>
		</div>
		<div>
			<Table
				:data="tableList"
				:columns="tableColumn"
				max-height="600"
				:border="true"
				stripe
			>
				<template slot="operation" slot-scope="{ row }">
					<Button
						type="warning"
						size="small"
						style="margin-right: 5px"
						@click="toEdit(row)"
						>编辑</Button
					>
					<Button type="error" size="small" @click="toDel(row)"
						>删除</Button
					>
					<Poptip
						title="确认要删除这一项吗?"
						placement="left"
						@on-ok="toDel"
						confirm
						transfer
					>
						<Icon
							type="ios-trash"
							size="18"
							style="
								cursor: pointer;
								margin-left: 10px;
								color: red;
							"
						/>
					</Poptip>
				</template>
			</Table>
		</div>
		<Modal
			title="iview-Title"
			v-model="showPageModal"
			width="1000"
			:styles="{ top: '40px' }"
			closable
			draggable
		>
			<Form
				:model="pageForm"
				:rules="pageFormRule"
				:label-width="100"
				ref="pageForm"
				inline
			>
				<FormItem prop="name" label="名字">
					<Input
						v-model="pageForm.name"
						placeholder="请输入"
						style="width: 200px"
					/>
				</FormItem>
				<FormItem prop="country" label="地区">
					<Select
						v-model="pageForm.country"
						style="width: 200px"
						placeholder="请选择"
					>
						<Option value="beijing">北京</Option>
						<Option value="London">伦敦</Option>
						<Option value="Sydney">悉尼</Option>
					</Select>
				</FormItem>
				<FormItem prop="date" label="日期">
					<DatePicker
						type="date"
						v-model="pageForm.date"
						style="width: 200px"
						placeholder="请选择日期"
					></DatePicker>
				</FormItem>
			</Form>
			<template slot="footer">
				<Button @click="showPageModal = false">关闭</Button>
				<Button
					@click="confirmPage"
					type="primary"
					:loading="confirmLoading"
					>确定</Button
				>
			</template>
		</Modal>
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
			tableColumn: [
				{
					type: "index",
					width: 60,
					align: "center",
				},
				{
					title: "Name",
					key: "name",
				},
				{
					title: "Age",
					key: "age",
				},
				{
					title: "日期",
					key: "date",
				},
				{
					title: "国家",
					key: "country",
				},
				{
					title: "操作",
					slot: "operation",
					width: "160",
					align: "center",
				},
			],
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
			this.pageForm = {
				id: null,
				name: "",
				country: "",
				date: new Date(),
			};
			this.$refs.pageForm.resetFields();
			this.showPageModal = true;
		},
		toEdit(r) {
			this.pageForm = {
				id: 2,
				...r,
			};
			this.$refs.pageForm.resetFields();
			this.showPageModal = true;
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
