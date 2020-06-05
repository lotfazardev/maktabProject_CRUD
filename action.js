$(document).foundation();
const userData = [] ;
// function writeLocalStorage(data){
//     localStorage.setItem("userData", (localStorage.getItem("userData") ? localStorage.getItem("userData") + "@+new" : "") + data);
// }
// function readLocalStorage(){
//     if(localStorage.getItem("userData")){
//         saved = localStorage.getItem("userData").split('@+new')
//         for(let i of saved){
//             userData.push(JSON.parse(i))
//         }
//     }
// }
// readLocalStorage()
// renderTable()
function renderTable(){
    $('#tabel-data').html("")
    for(let i = 0 ; i < userData.length ; i++){
        $('#tabel-data').append(
            `
            <tr>
              <td>${i+1}</td>
              <td>${userData[i].name}</td>
              <td>${userData[i].familyName}</td>
              <td>${userData[i].phoneNumber}</td>
              <td>${userData[i].telNumber}</td>
              <td>${userData[i].address}</td>
              <td>${userData[i].date}</td>
              <td>${userData[i].details}</td>
              <td>
              <div>
                  <button type="submit" class="button warning UD-buttons update-btn">
                    <span class="icon-pen"></span>
                  </button>
                  <button type="submit" class="button alert UD-buttons delete-btn">
                    <span class="icon-bin"></span>
                  </button>
                </div>
              </td>
            </tr>
            `
        )
    }
}
$(document).ready(function () {
    $('#add-contact-form').submit(function () {
        const tmp = {}
        for(let i = 0 ; i < $('.add-contact-inputs').length ; i++){
            let input = $('.add-contact-inputs')[i]
            tmp[input.name] = input.value
            input.value = ""
        }
        userData.push(tmp)
        // writeLocalStorage(JSON.stringify(tmp))
        renderTable()
        return false
    })
});