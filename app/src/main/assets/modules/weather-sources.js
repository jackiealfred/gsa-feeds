document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('md-radio[name="main_provider_radio"]');
  const saveButton = document.getElementById('saveSelectedMainProvider');
  const accuweatherInputItem = document.getElementById('accuweatherAPI_input_item');

  const storedProvider = localStorage.getItem('selectedMainWeatherProvider') || 'open-meteo';
  toggleAccuweatherInput(storedProvider);

  document.querySelector(`md-radio[value="${storedProvider}"]`).setAttribute('checked', 'true');


  saveButton.addEventListener('click', () => {
      const selectedProvider = Array.from(radioButtons).find(radio => radio.hasAttribute('checked'))?.value || 'open-meteo';
      localStorage.setItem('selectedMainWeatherProvider', selectedProvider);
            if (selectedProvider === 'Met norway') {
                 document.getElementById('mainProviderSelectedText').innerHTML = 'Met norway';

            } else if (localStorage.getItem('ApiForAccu') && selectedProvider === 'Accuweather') {
                document.getElementById('mainProviderSelectedText').innerHTML = 'Accuweather';

            } else if (selectedProvider === 'meteoFrance') {
                document.getElementById('mainProviderSelectedText').innerHTML = 'Météo-France';

            } else if (selectedProvider === 'dwdGermany') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'DWD Germany';


            } else if (selectedProvider === 'noaaUS') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'NOAA U.S.';


            } else if (selectedProvider === 'ecmwf') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'ECMWF';

            } else if (selectedProvider === 'ukMetOffice') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'UK Met Office';


            } else if (selectedProvider === 'jmaJapan') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'JMA Japan';


            } else if (selectedProvider === 'gemCanada') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'GEM Canada';

            } else if (selectedProvider === 'bomAustralia') {
            document.getElementById('mainProviderSelectedText').innerHTML = 'BOM Australia';

            } else if (selectedProvider === 'cmaChina') {
                document.getElementById('mainProviderSelectedText').innerHTML = 'CMA China';


            } else if (selectedProvider === 'knmiNetherlands') {
                document.getElementById('mainProviderSelectedText').innerHTML = 'KNMI Netherlands';


            } else if (selectedProvider === 'dmiDenmark') {
                document.getElementById('mainProviderSelectedText').innerHTML = 'DMI Denmark';

            } else {
                document.getElementById('mainProviderSelectedText').innerHTML = 'Open-Meteo';
        }

      toggleAccuweatherInput(selectedProvider);
      window.history.back();
  });

  radioButtons.forEach(radio => {
      radio.addEventListener('click', () => {
          radioButtons.forEach(r => r.removeAttribute('checked'));
          radio.setAttribute('checked', 'true');
      });
  });

  function toggleAccuweatherInput(provider) {
      if (provider === 'Accuweather') {
          accuweatherInputItem.style.maxHeight = '200px';
          accuweatherInputItem.style.opacity = '1';
      } else {
          accuweatherInputItem.style.maxHeight = '0';
          accuweatherInputItem.style.opacity = '0';
      }
  }
});
// -------------------------------------------------------



const selectMainAlertsProvider = document.getElementById('selectMainAlertsProvider');


selectMainAlertsProvider.addEventListener('input', () =>{
    localStorage.setItem('selectedMainAlertsProvider', selectMainAlertsProvider.value)

});


if(!localStorage.getItem('selectedMainAlertsProvider')){
localStorage.setItem('selectedMainAlertsProvider', 'weatherapi-alert');
document.querySelector(`[value="weatherapi-alert"]`).selected = true;

}

const getSelectedMainAlertsProvider = localStorage.getItem('selectedMainAlertsProvider')


if(localStorage.getItem('selectedMainAlertsProvider')){
  document.querySelector(`[value="${getSelectedMainAlertsProvider}"]`).selected = true;
}


// -------------------------------------------------------

const selectMainSearchProvider = document.getElementById('selectMainSearchProvider');


selectMainSearchProvider.addEventListener('input', () =>{
    localStorage.setItem('selectedMainSearchProvider', selectMainSearchProvider.value)

});


if(!localStorage.getItem('selectedMainSearchProvider')){
localStorage.setItem('selectedMainSearchProvider', 'open-meteo-search');
document.querySelector(`[value="open-meteo-search"]`).selected = true;

}

const getSelectedMainSearchProvider = localStorage.getItem('selectedMainSearchProvider')


if(localStorage.getItem('selectedMainSearchProvider')){
  document.querySelector(`[value="${getSelectedMainSearchProvider}"]`).selected = true;
}

// --------------------------------------------


document.getElementById('input_accuweather_field').addEventListener('input', ()=>{
  localStorage.setItem('ApiForAccuTemp', document.getElementById('input_accuweather_field').value)
});

const ApiForAccu = localStorage.getItem('ApiForAccu');

if(ApiForAccu){
  document.getElementById('input_accuweather_field').value = ApiForAccu;
} else if (localStorage.getItem('ApiForAccuTemp')){
  document.getElementById('input_accuweather_field').value = localStorage.getItem('ApiForAccuTemp');;

} else{

}


function verifyKeyAccu(){
  const locationKey = '188524';
  const apiKey = document.getElementById('input_accuweather_field').value;

  const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('ApiForAccu', document.getElementById('input_accuweather_field').value)
      localStorage.removeItem('ApiForAccuTemp')
       ToastAndroidShow.ShowToast('API was verified', 'long');

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      localStorage.removeItem('ApiForAccuTemp')
      localStorage.setItem('selectedMainWeatherProvider', 'open-meteo');
       ToastAndroidShow.ShowToast('Wrong API', 'long');
    });
}