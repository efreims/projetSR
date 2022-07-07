<template>
    <div class="container">
        <div class="left_side">
            <div class="item">
                <Listemembres @recherche-membre="recherchemembre" @ajout-ami="ajoutAmi" :listemembres="listemembres" :listerecherche="listerecherche"></Listemembres>
                <Notifami @accept-ami="acceptAmi" :listnotifami="listnotifami" ></Notifami>
            </div>
            <Sectionami @afficher-conv="afficherConv" :listami="listami" class="item"></Sectionami>
        </div>
        <div class="right_side">
            <Conversation @submit-password = "submitpassword" @submit-message="submitmessage" :listmessage="listmessage" :displaydecrypt="displaydecrypt" :onconv="onconv" :namesender="namesender" :namereceiver="namereceiver" class="conversation"> </Conversation>
        </div>
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
            onconv : Number,
            listerecherche:Array,
            namereceiver:String,
            namesender:String,
            displaydecrypt:Boolean
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
            },
            recherchemembre(nom){
                this.$emit('recherche-membre',nom)
            }
        },
    }

</script>

<style scoped>

.container{
    width : 100vw;
    display: flex;
}

.left_side{
    width:25vw;
    border-right: 1px solid #D4D3E8;
    display : flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 80vh;
    
}
.right_side{
    width: 75vw;
    padding-right: 15px;
    height: 90vh;
}

.item{
    background-color: #fafafa;
    width: 65%;
    padding: 5%;
    border-radius: 1rem;
    align-self: center;
    box-shadow: 1px 1px 3px rgb(178, 180, 180);
    margin-bottom: 10vh;
}
</style>

