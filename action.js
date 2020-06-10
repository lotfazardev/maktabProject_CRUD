$(document).foundation();
let userData = [];
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
function renderTable() {
  $("#tabel-data").html("");
  for (let i = 0; i < userData.length; i++) {
    $("#tabel-data").append(
      `
            <tr>
              <td>${i + 1}</td>
              <td>${userData[i].name}</td>
              <td>${userData[i].familyName}</td>
              <td>${userData[i].phoneNumber}</td>
              <td>${userData[i].telNumber}</td>
              <td>${userData[i].address}</td>
              <td>${userData[i].date}</td>
              <td>${userData[i].details}</td>
              <td>
              <div>
                  <button data-column="${i}" type="submit" onclick="editItem(this)" class="button warning UD-buttons update-btn">
                    <span class="icon-pen"></span>
                  </button>
                  <button data-column="${i}" onclick="deleteItem(this)" type="submit" class="button alert UD-buttons delete-btn">
                    <span class="icon-bin"></span>
                  </button>
                </div>
              </td>
            </tr>
            `
    );
  }
}
$(document).ready(function () {
  $("#add-contact-form").submit(function () {
    const tmp = {};
    for (let i = 0; i < $(".add-contact-inputs").length; i++) {
      let input = $(".add-contact-inputs")[i];
      tmp[input.name] = input.value;
      input.value = "";
    }
    userData.push(tmp);
    // writeLocalStorage(JSON.stringify(tmp))
    renderTable();
    return false;
  });

  $("#delete-all-btn").click(function () {
    if (!userData.length) {
      Swal.fire("موردی برای حذف وجود ندارد", "", "warning");
    } else {
      Swal.fire({
        title: "آیا از پاک کردن تمامی موارد اطمینان دارید ؟",
        text: "توجه تمامی اطلاعات پاک شده غیر قابل بازگشت می باشد !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "نه پاکشون نکن !",
        confirmButtonText: "آره همشونو پاک کن !",
      }).then((result) => {
        if (result.value) {
          userData = [];
          renderTable();
          Swal.fire("پاک شد!", "تمامی مخاطبین با موفقیت پاک شد", "success");
        }
      });
    }
  });
});
function deleteItem(item) {
  Swal.fire({
    title: "آیا به حذف این مخاطب اطمینان دارید ؟",
    text: "توجه تمامی اطلاعات پاک شده غیر قابل بازگشت می باشد !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "نه پاکش نکن !",
    confirmButtonText: "آره میدونم پاکش کن",
  }).then((result) => {
    if (result.value) {
      let selected = item.getAttribute("data-column");
      userData.splice(selected, 1);
      renderTable();
      Swal.fire("مخاطب مورد نظر حذف شد !", "", "success");
    }
  });
}
function editItem(item) {
  Swal.fire({
    title: "ویرایش اطلاعات کاربر",
    icon: "warning",
    html: `<div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <label>نام
          <input class="edit-contact-inputs" type="text" name="name" placeholder="نام شما">
        </label>
      </div>
      <div class="cell">
        <label>نام خانوادگی
          <input class="edit-contact-inputs" type="text" name="familyName" placeholder="فامیلی">
        </label>
      </div>
      <div class="cell">
        <label>تلفن همراه
          <input class="edit-contact-inputs" type="number" name="phoneNumber" placeholder="09XX XXX XXXX">
        </label>
      </div>
      <div class="cell">
        <label>شماره منزل
          <input class="edit-contact-inputs" type="number" name="telNumber" placeholder="021-88XXXXXX">
        </label>
      </div>
      <div class="cell">
        <label>آدرس
          <input class="edit-contact-inputs" type="text" name="address" placeholder="تهران - خیابان ستارخان ...">
        </label>
      </div>
      <div class="cell">
        <label>آدرس
          <input class="edit-contact-inputs" type="date" name="date" placeholder="تهران - خیابان ستارخان ...">
        </label>
      </div>
      <div class="cell">
        <label>توضیحات
          <textarea class="edit-contact-inputs" name="details" placeholder="توضیحات برای مخاطب"></textarea>
        </label>
      </div>
    </div>
  </div>`,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "تغییر نده !",
    confirmButtonText: "تغییرات رو اعمال کن",
  }).then((result) => {
    if (result.value) {
      const tmp = {};
      for (let i = 0; i < $(".edit-contact-inputs").length; i++) {
        let input = $(".edit-contact-inputs")[i];
        tmp[input.name] = input.value;
        input.value = "";
      }
      let selected = item.getAttribute("data-column");
      userData[selected] = tmp
      // writeLocalStorage(JSON.stringify(tmp))
      renderTable();
      Swal.fire({
        title: "اطلاعات کاربر مورد نظر اصلاح شد",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "حله !",
      });
    }
  });
}
