<template>
    <iframe :src="url"></iframe>
</template>

<script>
    export default {
        created () {
            this.url = this.$route.query.url;
        },
        data() {
            return {
                url:""
            }
        },
        
    }
</script>

<style lang="scss" scoped>
div{
    width: 100%;
    height: 10rem;
}
iframe{
    width: 100%;
    height: 1000px;
    border: 0;
}

</style>