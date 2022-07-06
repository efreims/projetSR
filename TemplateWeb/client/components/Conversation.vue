<template>
    <div class="container">
        {{displaydecrypt}}
        <div class="contactOn">
            <p>{{namereceiver}}</p>
            <p>{{namesender}}</p>
        </div>
         <p v-if="onconv==-1" class="temp">
            Veuillez selectionner une conversation
        </p>
        <div class="conv_container">
            <div v-for="(message,index) in listmessage[0]" :key="index" class="conv">
                <div class="messageLeft" v-bind:class="{ messageRight : !message.send}">
                    <p class="message"  v-bind:class="{ messageL : !message.send}"> {{message.message}}</p>
                    <p class="date">{{message.date}}</p>
                </div>
            </div> 
        </div>
        <div class="form_end">
            <form v-if="onconv!=-1" @submit.prevent="submitmessage">
                <input type="txt" placeholder="votre message" v-model="messagesend">
                <button>Envoyer</button>
            </form>

            <form v-if="onconv!=-1" @submit.prevent="submitpassword">
                <input type="password" placeholder="Tapez votre mdp" v-model="passwordDecrypt">
                <button>Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "Accueil",
        props: {
            resultlogin:Number,
            listmessage:Array,
            onconv:Number,
            namereceiver:String,
            namesender:String,
            displaydecrypt:Boolean
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
                this.messagesend =""
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
    height: 100%;
    padding-top : 15px;
    padding-bottom : 15px;
    padding-left : 15px;
    justify-content: flex-start;
    /* align-content: center; */
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
	color: rgb(126, 198, 233);
	box-shadow: 0px 2px 2px #122938ee;
	cursor: pointer;
	transition: .2s;
}
button:active,
button:focus,
button:hover {
	border-color: rgb(126, 198, 233);
	outline: none;
}
form{
    display : flex;
    align-self: flex-end;
    margin-bottom: 15px;
}

.form_end{
    padding : 5px;
}
.conv_container{
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    height: 70vh;
    overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
}

.conv{
    display: flex;
    flex-direction: column;
    padding-right: 10px;
}

.message{
    padding : 15px;
    background: rgb(96, 21, 203);
    color : white;
    /* width : fit-content; */
    border-radius: 1rem;
    font-weight: 500;
    max-width: 20vw;
    height: fit-content;
}
.messageLeft{
    align-self : flex-end;
    margin-bottom: 15px;
    display : flex;
    flex-direction : column;
    align-items: flex-end;

}
.messageL{
    background: rgb(178, 180, 180);
}
.messageRight{
    align-self : flex-start;
    margin-bottom: 15px;
    display : flex;
    flex-direction : column;
    align-items: flex-start;
}
.date{
    font-size: 0.7em;
    color : #7a8388;
}

.temp{
    color:green
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: none;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(190, 190, 190, 0.514);
  border-radius: 20px;
}
</style>

