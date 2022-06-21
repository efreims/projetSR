<template>
    <div>
        <p>Page réservé aux membres connectés</p>
        <Conversation @submit-password = "submitpassword" @submit-message="submitmessage" :listmessage="listmessage" class="conversation"> </Conversation>
        <Listemembres @ajout-ami="ajoutAmi" :listemembres="listemembres"></Listemembres>
        <Notifami @accept-ami="acceptAmi" :listnotifami="listnotifami"></Notifami>
        <Sectionami :listami="listami"></Sectionami>
    </div>
</template>

<script>
     module.exports = {
        name : "Accueil",
        props: {
            resultlogin:Number,
            listmessage:Array,
            listemembres:Array,
            listnotifami : Array,
            listami : Array

        },
        components:{
            Conversation,
            Listemembres,
            Notifami,
            Sectionami,
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
            },
            ajoutAmi(id){
                this.$emit('ajout-ami',{id : id})
            },
            acceptAmi(relationId){
                this.$emit('accept-ami',relationId)
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

