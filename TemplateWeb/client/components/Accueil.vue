<template>
    <div>
        Page réservé aux membres connectés
        <Conversation @submit-message="submitmessage" :listmessage="listmessage"> </Conversation>
    </div>
</template>

<script>
     module.exports = {
        name : "Accueil",
        props: {
            resultlogin:Number,
            listmessage:Array
        },
        components:{
            Conversation
        },
        data(){
            return{
                
            }
        },
        methods : {
            submitmessage(messagesend){
                console.log('test')
                this.$emit('submit-message',messagesend)
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style>

