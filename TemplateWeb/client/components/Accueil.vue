<template>
    <div>
        <p>Page réservé aux membres connectés</p>
        <Conversation @submit-password = "submitpassword" @submit-message="submitmessage" :listmessage="listmessage" :onconv="onconv" class="conversation"> </Conversation>
        <Listemembres @ajout-ami="ajoutAmi" :listemembres="listemembres"></Listemembres>
        <Notifami @accept-ami="acceptAmi" :listnotifami="listnotifami"></Notifami>
        <Sectionami @afficher-conv="afficherConv" :listami="listami"></Sectionami>
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
            listami : Array,
            onconv : Number
        },
        components:{
            Conversation,
            Listemembres,
            Notifami,
            Sectionami,
        },
        data(){
            return {

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
            },
            afficherConv(id){
                this.onConv = id
                this.$emit('afficher-conv',{id : id})
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

