<template>
    <div>
        <p>Page réservé aux membres connectés</p>
        <Conversation @submit-password = "submitpassword" @submit-message="submitmessage" :listmessage="listmessage" class="conversation"> </Conversation>
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
            },
             submitpassword(password){
                this.$emit('submit-password',password)
            }
    
        },
        mounted(){
            this.$emit("load-data")
        }
    }

</script>

<style scoped>
.conversation{
    width: 100vw;
}
</style>

