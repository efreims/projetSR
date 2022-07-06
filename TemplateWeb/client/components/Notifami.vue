<template>
    <div>
        <h1>Notifications</h1>
        <div v-for="(user,index) in listnotifami" :key="index" class="item_contact">
            <!-- <h2> Notif   {{index + 1}}</h2> -->
             <p class="first">{{user.name}}</p>
            <button @click="accept(user.relationId)" class="second">Accepter</button>
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
h1{
    color: rgb(178, 180, 180);
    text-shadow: 1px 1px 0px rgb(170, 170, 170);
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
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

