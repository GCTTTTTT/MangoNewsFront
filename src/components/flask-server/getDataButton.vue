<template>
    <div>
        <button @click="getData">获取数据</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        getData() {
            axios.get('http://localhost:9997/get_data')
                .then(response => {
                    // alert(JSON.stringify(response.data));
                    // 使用 JSON.parse() 解析收到的 JSON 数据
                    // const jsonData = JSON.parse(JSON.stringify(response.data));
                    // alert(JSON.stringify(jsonData));
                    const jsonData = response.data;
                    // const jsonData = JSON.parse(decodeURIComponent(JSON.stringify(response.data)));

                    alert(JSON.stringify(jsonData));
                })
                .catch(error => {
                    alert('发生错误：' + error);
                });
        }
    }
}
</script>