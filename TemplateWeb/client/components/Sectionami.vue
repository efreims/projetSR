<template>
    <div>
        <h1>Liste des amis </h1>
        <div v-for="(user,index) in listami" :key="index">
            <h2> Ami   {{index + 1}}</h2>
             <p>{{user.name}}</p>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "ListeMembres",
        props: {
            listami:Array
        },
        data(){
            return{
                
            }
        },
        methods : {
            accept(relationId){
                this.$emit('accept-ami',relationId)
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style scoped>

</style>

