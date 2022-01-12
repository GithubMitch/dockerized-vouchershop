<template>
  <div id="SalesProps">
    <span id="SalesPropsContent" mode="out-in">
        <div id="InstantDelivery">
          <img src="@/assets/smsEmail.png">
          <h1>Direct ontvangen!</h1>
          <p class="desc">Krijg je code direct per sms en e-mail opgestuurd.</p>
        </div>
        <div id="PayWith">
          <img src="@/assets/payiDeal.png">
          <h1>Betaal makkelijk!</h1>
          <p class="desc">Betaal met iDEAL, makkelijk, snel en veilig.</p>
        </div>
        <div id="NoRegistration">
          <img src="@/assets/speedCart.png">
          <h1>Geen registratie!</h1>
          <p class="desc">Geen gedoe met wachtwoorden. Direct bestellen en gaan!</p>
        </div>
    </span>
  </div>
</template>
<style lang="scss">
  footer{
    flex: 0 1 10%;
    border-top: 1px solid #bb5215;
    background: #ff7514 repeating-linear-gradient(45deg, #ff7514, #f36000a1 100px);
    color: #FFF;
    box-shadow: -0px -4px 1px #00000030;
    margin-top: 3em;

    #FooterContent{
      padding: 1em;
      max-width: 990px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      text-align: left;
      ul {
        list-style:none;
      }
      a{
        display: block;
        margin-bottom: 17px;
        text-decoration: none;
        color: #FFF;
        border-bottom: 2px solid transparent;
        &.router-link-exact-active{
          border-bottom: 2px solid #FFF;
        }
        &:active{
          transform: translateY(1px)
        }
      }
    }

    #PaymentLogos{
      margin-top: 1.5em;
      background: #FFF;
      border-radius: 7px;
      min-height: 3.5em;
      margin-bottom:1em;
      &:active{
        transform: scale(0.99);
        opacity: 0.99;
      }
      h3{
        color: #717171;
        font-size: 12px;
        border-bottom: orange 1px solid;
      }
    }

    #FooterLogo{
      h3{
        margin-top: 1.5em;
        padding-left: 7px;
        margin-bottom: 5px;
        font-size: 80%;
      }
      img{
        max-width: 120px;
      }
    } 
  }
</style>