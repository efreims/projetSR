<template>
    <div>
        <h1>Liste des notifs</h1>
        <div v-for="(user,index) in listnotifami" :key="index">
            <h2> Notif   {{index + 1}}</h2>
             <p>{{user.name}}</p>
            <button @click="accept(user.relationId)">Accepter</button>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "ListeMembres",
        props: {
            listnotifami:Array
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

