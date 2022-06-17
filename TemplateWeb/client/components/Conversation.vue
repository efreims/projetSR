<template>
    <div class="container">
        <div v-for="(message,index) in listmessage[0]" :key="index" class="conv">
            <div class="messageLeft" v-bind:class="{ messageRight : !message.send}">
                <p class="message"> {{message.message}}</p>
                <p class="date">{{message.date}}</p>
            </div>
        </div> 

        <form @submit.prevent="submitmessage">
            <input type="txt" placeholder="votre message" v-model="messagesend">
            <button>Envoyer</button>
        </form>

        <form @submit.prevent="submitpassword">
            <input type="password" placeholder="Tapez votre mdp" v-model="passwordDecrypt">
            <button>Envoyer</button>
        </form>
    </div>
</template>

<script>
     module.exports = {
        name : "Accueil",
        props: {
            resultlogin:Number,
            listmessage:Array
        },
        data(){
            return{
                messagesend:"",
                passwordDecrypt:""
            }
        },
        methods : {
            submitmessage(){
                console.log('yes')
                this.$emit('submit-message',this.messagesend)
            },
            submitpassword(){
                this.$emit('submit-password',this.passwordDecrypt)
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
    flex-direction : column;
    width: 100%;
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
	border-bottom-color: #1270AB;
}
button {
	background: #fff;
	font-size: 0.7em;
	/* margin-top: 0.5%; */
	padding: 5px 7px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: max-content;
	color: #1270AB;
	box-shadow: 0px 2px 2px #122938ee;
	cursor: pointer;
	transition: .2s;
}
button:active,
button:focus,
button:hover {
	border-color: #1270AB;
	outline: none;
}
form{
    display : flex;
    align-self: flex-end;
    margin-bottom: 15px;
}
.conv{
    display: flex;
    flex-direction: column;
}
.message{
    padding : 15px;
    background: #1270AB;
    color : white;
    width : max-content;
    border-radius: 1.3rem;
    font-weight: 500;
}
.messageLeft{
    align-self : flex-end;
    margin-bottom: 15px;
}
/* .messageLeft .message{
    background: rgb(83, 152, 196);
} */
.messageRight{
    align-self : flex-start;
    margin-bottom: 15px;
}
.date{
    font-size: 0.7em;
    color : #7a8388;
}
</style>

