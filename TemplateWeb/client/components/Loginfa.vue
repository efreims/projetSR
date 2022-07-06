<template>
    <div class="page">
        <div class="container">
            <p class="t">Double authentification</p>
            <p>Veuillez utiliser Google Authenficator</p>
            <form @submit.prevent="submitcode">
                <input type="txt" placeholder="Code 2FA" v-model="code" class="input">
                <button class="button">Submit code </button>
            </form>
            <p style="color:red;" v-if="errormessagelogin2fa==1">Code incorrect</p>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "Loginfa",
        props: {
            resultlogin:Number,
            errormessagelogin2fa:Number
        },
        data(){
            return{
                code:""
            }
        },
        methods : {
            submitcode(){
                console.log('yes')
                this.$emit('login-fa',this.code)
                
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style scoped>


.t{
    color: #1270AB;
    font-size: 1.2rem;
    padding: 5px;
}
.page{
    height: 100vh;
    display: flex;
    justify-content: center;
}
.container{
    background-color: #fafafa;
    padding: 5%;
    border-radius: 1rem;
    box-shadow: 1px 1px 3px rgb(178, 180, 180);
    margin : auto;
    display:flex;
    flex-direction: column;
    align-items: center;

}

.input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 10px;
	font-weight: 700;
	transition: .2s;
    flex-grow: 1;
}
.input:active,
.input:focus,
.input:hover {
	outline: none;
	border-bottom-color: rgb(126, 198, 233);
}
.button {
	background: #fff;

	/* margin-top: 0.5%; */
	padding: 3px;
	border-radius: 0.5rem;
	border: 1px solid #D4D3E8;
	color: rgb(126, 198, 233);
	box-shadow: 0px 2px 2px rgb(170, 170, 170);
	cursor: pointer;
	transition: .2s;
}
.button:active,
.button:focus,
.button:hover {
	border-color: rgb(126, 198, 233);
	outline: none;
}
</style>

