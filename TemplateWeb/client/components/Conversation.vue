<template>
    <div>
        <div v-for="(message,index) in listmessage[0]" :key="index" class="conv">
            <p> {{message}}</p>
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

<style>

