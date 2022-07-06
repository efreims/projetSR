<template>
    <div class="container">
        <!-- <h1>Ajouter Contact</h1> -->
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
        <input v-on:keyup="recherchemembre()" type="txt" v-model="nom" placeholder="Ajouter Contact">
        <div v-for="(user,index) in listerecherche" :key="index" class="item_contact">
            <!-- <h2> Membre  {{index + 1}}</h2>
             <p>{{user.userId}}</p> -->
            <p class="first">{{user.name}}</p>
            <!-- <p>{{user.email}}</p> -->
            <button v-if="user.relationId==undefined" @click="ajoutami(user.userId)" class="second">Ajouter</button>
            <div style="color:green;" v-if="user.relationId!=undefined" class="second">Deja ami </div>
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

.container{
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 5px;
}

input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 10px;
	font-weight: 700;
	transition: .2s;
    flex-grow: 1;
}
input:active,
input:focus,
input:hover {
	outline: none;
	border-bottom-color: rgb(126, 198, 233);
}

.item_contact{
    display: flex;
    padding: 5px;
    justify-content: space-between;
    width: 80%;
}

.first .second{
    padding : 3px;
}

button {
	background: #fff;

	/* margin-top: 0.5%; */
	padding: 1px;
	border-radius: 0.5rem;
	border: 1px solid #D4D3E8;
	color: rgb(126, 198, 233);
	box-shadow: 0px 2px 2px rgb(170, 170, 170);
	cursor: pointer;
	transition: .2s;
}
button:active,
button:focus,
button:hover {
	border-color: rgb(126, 198, 233);
	outline: none;
}
</style>

