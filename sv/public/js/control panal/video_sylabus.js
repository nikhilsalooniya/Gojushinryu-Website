/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ   
Insha Allab,  By the marcy of Allah,  I will gain success
*/

const colors = [
    'white',
    'yellow',
    'orange',
    'green',
    'blue',
    'purple',
    'purple',
    'brown',
    'brown',
    'brown',
]

{
    let container = document.querySelector("#v_sylabus");
    let seen = false;
    let videos = [];
    let table = container.querySelector('table');
    let tbody = table.querySelector('tbody');

    let observer = new IntersectionObserver(async function (entry) {
        try {
            let response = await fetch(window.location.origin + '/api/api_s/sylabus/assets/video');
            if (response.status === 200) {
                videos = (await response.json()) || [];
                orgTable()
            }
        } catch (error) {
            console.log(error);
        }

    });
    observer.observe(container);

    async function orgTable() {
        tbody.innerHTML = null;
        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            let tr = document.createElement('tr');
            tr.setAttribute('asid', v.id);
            {
                let td = document.createElement('td');
                td.innerHTML = v.title;
                tr.appendChild(td);
            }
            {
                let td = document.createElement('td');
                // let txt = document.createElement('input');
                // txt.value = "Yellow Belt";
                // txt.disabled=true;
                // td.append(txt)

                let txt = document.createElement('select');
                txt.style.width = '100%';
                txt.style.color = v.colorCode > 1 ? 'white' : 'black';
                txt.style.backgroundColor = colors[v.colorCode];
                txt.style.border = '1px solid lightgray';
                txt.name = "color-belt";
                txt.id = 'color-belt';
                txt.disabled=true;
                txt.innerHTML = (`
                  <option value="0" style="color: black; background-color: ${colors[0]}" ${v.colorCode == 0 ? 'selected' : ""}>White</option>
                  <option value="1" style="color: black; background-color: ${colors[1]}" ${v.colorCode == 1 ? 'selected' : ""}>Yellow</option>
                  <option value="2" style="color: white; background-color: ${colors[2]}" ${v.colorCode == 2 ? 'selected' : ""}>Orange</option>
                  <option value="3" style="color: white; background-color: ${colors[3]}" ${v.colorCode == 3 ? 'selected' : ""}>Green</option>
                  <option value="4" style="color: white; background-color: ${colors[4]}" ${v.colorCode == 4 ? 'selected' : ""}>Blue</option>
                  <option value="5" style="color: white; background-color: ${colors[5]}" ${v.colorCode == 5 ? 'selected' : ""}>Purple</option>
                  <option value="6" style="color: white; background-color: ${colors[6]}" ${v.colorCode == 6 ? 'selected' : ""}>Purple+1</option>
                  <option value="7" style="color: white; background-color: ${colors[7]}" ${v.colorCode == 7 ? 'selected' : ""}>Brown</option>
                  <option value="8" style="color: white; background-color: ${colors[8]}" ${v.colorCode == 8 ? 'selected' : ""}>Brown+1</option>
                  <option value="9" style="color: white; background-color: ${colors[9]}" ${v.colorCode == 9 ? 'selected' : ""}>Brown+2</option>
                `)

                txt.onchange = (e) => {
                    e.preventDefault();
                    const value = e.target?.value;
                    txt.style.color = value > 1 ? 'white' : 'black';
                    txt.style.backgroundColor = colors[value];
                }

                td.append(txt);
                tr.appendChild(td);
            }
            {
                let td = document.createElement('td');
                let txt = document.createElement('textarea');
                txt.value = v.code;
                txt.disabled=true;
                td.append(txt)
                tr.appendChild(td);
            }
            {
                let td = document.createElement('td');
                let btn1 = document.createElement('button'), btn2 = document.createElement('button');
                btn1.innerHTML = `Edit`;
                btn1.setAttribute('mode', 'edit');
                btn1.setAttribute('asid', v.id);
                btn1.setAttribute('class', 'edit-v-ast');
                btn1.addEventListener('click', editButton);
                btn2.innerHTML = `Delete`;
                btn2.setAttribute('asid', v.id);
                btn2.onclick=deleteButton;
                td.append(btn1);
                td.append(btn2);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }


    async function editButton(event = new Event('click')) {
        try {
            event.preventDefault();
            let
                asid = event.target.getAttribute('asid'),
                mode = event.target.getAttribute('mode');
            let tr = tbody.querySelector(`tr[asid="${asid}"]`)
            if (mode === 'edit') {

                tr.querySelectorAll('input,textarea,select').forEach(el => (el.disabled = false));
                tr.querySelector('.edit-v-ast').setAttribute('mode', 'save');
                tr.querySelector('.edit-v-ast').innerHTML='Save';
                return;
            }
            if (mode === 'save') {
                let txt = tr.querySelector('textarea').value.trim();
                if (!txt) {
                    tr.querySelector('textarea').style.outline = '2px solid red';
                    tr.querySelector('textarea').addEventListener('input', function rm(event) {
                        event.target.style.outline = 'none';
                        event.target.removeEventListener('input', rm);
                    });
                    throw 'Error , input is null';
                };

                // get colour belt value
                let selectInPut = tr.querySelector('select');
                let colorCode = Number(selectInPut.value);

                let response = await fetch(window.location.origin + '/api/api_s/sylabus/assets/video', {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        code: txt,
                        colorCode: colorCode,
                        id: Number(asid)
                    })
                });

                if (response.status === 200) {
                    for (let i = 0; i < videos.length; i++) {
                        if (videos[i].id == asid) {
                            videos[i].code = txt;
                            videos[i].colorCode = colorCode;
                        }
                    }
                    orgTable();
                }
                tr.querySelector('textarea, select').disabled = true;
                tr.querySelector('.edit-v-ast').setAttribute('mode', 'edit');
                tr.querySelector('.edit-v-ast').innerHTML='Edit';
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteButton(event = new Event('click')) {
        try {
            event.preventDefault();
            let id = event.target.getAttribute('asid');
            await fetch(window.location.origin + '/api/api_s/sylabus/assets/video?id=' + id, { method: 'delete' });
            videos=videos.filter(function (element) {
                if (element.id != id) return element;
            });
            orgTable();
        } catch (error) {
            console.log(error);
        }
    }
    // Forms 
    let form = container.querySelector('form');
    let clrButton = form.querySelector('.clr-btn');
    let addButton = form.querySelector('.add-btn');
    let titleInput = form.querySelector('input'), txtInput = form.querySelector('textarea');
    let selectInput = form.querySelector('#change-belt');

    selectInput.addEventListener('change', (e) => {
        e.preventDefault();
        const select = e.target;
        const value = Number(select?.value);

        selectInput.style.color = value > 1 ? 'white' : 'black';
        selectInput.style.backgroundColor = colors[value];
    })

    addButton.addEventListener('click', addVideo)
    clrButton.addEventListener('click', clearFormInput);
    let isAddingVideo = false;
    async function addVideo(e = new Event('click')) {
        try {
            e.preventDefault();
            if (isAddingVideo) return;
            isAddingVideo = true;
            let title = titleInput.value;
            let colorCode = selectInput.value;
            let code = txtInput.value;
            if (!title.trim() || !code.trim()) {
                function makeitRed(input = titleInput) {
                    input.style.outline = '2px solid red';
                    input.addEventListener('input', function rm() {
                        input.style.outline = 'none';
                        input.removeEventListener('input', rm);
                    });
                    throw 'Error , input is null';
                }
                if (!title.trim()) makeitRed();
                if (!code.trim()) makeitRed(txtInput);
            }
            let response = await fetch(window.location.origin + '/api/api_s/sylabus/assets/video', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title, code, colorCode
                })
            });
            if (response.status === 200) {
                let data = await response.json();
                clearFormInput();
                videos.push(data)
                orgTable();
            }
        } catch (error) {
            console.log(error);
        } finally {
            isAddingVideo = false;
        }
    }
    function clearFormInput(e = new Event('click')) {
        e.preventDefault();
        form.querySelectorAll('input,textarea').forEach(el => el.value = null);
    }
}