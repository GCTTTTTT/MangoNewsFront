<!-- <template>
    <div>
        <div>
            <label for="date-picker">选择日期:</label>
            <input type="date" id="date-picker" v-model="selectedDate" @change="fetchData" />
        </div>
        <div v-if="data">
            <h3>{{ selectedDate }} 的数据:</h3>
            <ul>
                <li v-for="item in data" :key="item.id">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedDate: '',
            data: null,
        };
    },
    methods: {
        fetchData() {
            const url = `http://localhost:9997/get_data?date=${this.selectedDate}`;
            axios.get(url)
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.error('发生错误:', error);
                });
        },
    },
};
</script> -->


<template>
    <div>
        <el-date-picker v-model="selectedDate" type="date" placeholder="选择日期"
            @change="handleDateChange"></el-date-picker>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: ''
        };
    },

    computed: {
        formattedDate() {
            if (this.selectedDate) {
                const date = new Date(this.selectedDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return '';
        }
    },

    methods: {
        handleDateChange() {
            // 触发自定义事件，并传递选择的日期
            this.$emit('dateSelected', this.formattedDate);
        }
    }
};
</script>