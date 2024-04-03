<template>
    <div class="dark-card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "CardPanel"
}
</script>

<style scoped>
.dark-card {
    margin-top: 150px;
    /* update:3.16 */
    padding: 15px;
    background-color: #f4f5f6;
    border: solid 1px #ebeef5;
}
</style>