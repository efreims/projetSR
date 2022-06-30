<template>
    <div>
        <h1>Liste Membres</h1>
        <div v-for="(user,index) in listemembres" :key="index">
            <h2> Membre  {{index + 1}}</h2>
             <p>{{user.userId}}</p>
            <p>{{user.name}}</p>
            <p>{{user.email}}</p>
            <button @click="ajoutami(user.userId)">Ajouter en ami </button>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "ListeMembres",
        props: {
            listemembres:Array
        },
        data(){
            return{
                
            }
        },
        methods : {
            ajoutami(id){
                this.$emit('ajout-ami',id)
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style scoped>

</style>

