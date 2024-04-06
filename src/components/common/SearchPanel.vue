<template>
    <div class="search">
        <el-input v-model="message" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="search">{{ tip }}</el-button>
    </div>
</template>

<script>
/**
 * 搜索面板
 *
 * 调用此模块需要实现 search 监听器, 用于获取输入搜索框中的信息
 */
export default {
    name: "SearchPanel",
    props: ['tip'],
    methods: {
        getYesterdayDate() {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 15);

            const year = yesterday.getFullYear();
            const month = String(yesterday.getMonth() + 1).padStart(2, '0');
            const day = String(yesterday.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        search: function () {
            // DONE
            // alert("SearchPanel" + this.date_sel + ' ' + this.message);
            this.$emit('search', this.date_sel, this.message); // 这里没传上去？
        }
    },
    data: function () {
        return {
            date_sel: this.getYesterdayDate(),

            message: '',
        }
    }
}
</script>

<style scoped>
.search {
    /* width: 400px; */
    width: 250px;

    float: left;
    /* margin-left: 20%; */
    /* FIX */
    margin-left: 8%;

}

.search>>>.el-input {
    /* width: 300px; */
    width: 150px;

    float: left;
}

.search>>>.el-input__inner {
    border-radius: 5px 0px 0px 5px;
    line-height: unset;
}

.search>>>.el-button {
    float: left;
    border-radius: 0px 5px 5px 0px;
}
</style>