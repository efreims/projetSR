<template>
    <div>
        <h1>Liste Membres</h1>
        <!--
        <div v-for="(user,index) in listemembres" :key="index">
            <h2> Membre  {{index + 1}}</h2>
             <p>{{user.userId}}</p>
            <p>{{user.name}}</p>
            <p>{{user.email}}</p>
            <button v-if="user.relationId==undefined" @click="ajoutami(user.userId)">Ajouter en ami </button>
            <div style="color:green;" v-if="user.relationId!=undefined" >Deja ami </div>
        </div>
        -->
        <input v-on:keyup="recherchemembre()" type="txt" v-model="nom">
        <div v-for="(user,index) in listerecherche" :key="index">
            <h2> Membre  {{index + 1}}</h2>
             <p>{{user.userId}}</p>
            <p>{{user.name}}</p>
            <p>{{user.email}}</p>
            <button v-if="user.relationId==undefined" @click="ajoutami(user.userId)">Ajouter en ami </button>
            <div style="color:green;" v-if="user.relationId!=undefined" >Deja ami </div>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "ListeMembres",
        props: {
            listemembres:Array,
            listerecherche:Array
        },
        data(){
            return{
                nom:""
            }
        },
        methods : {
            ajoutami(id){
                this.$emit('ajout-ami',id)
            },
            recherchemembre(){
                this.$emit('recherche-membre',this.nom)
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style scoped>

</style>

