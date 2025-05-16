/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ   
Insha Allab,  By the marcy of Allah,  I will gain success
*/


window.addEventListener('DOMContentLoaded', async function () {
    try { 
        document.getElementById('mastersGrid').style.display = 'none';
        document.getElementById('skeletonGrid').style.display = 'flex';
        let response=await fetch(window.location.origin + '/api/api_s/allience-grand-master');
        if (response.status===200) {
            let Masters =await response.json();
            console.log(Masters);
            Masters = Masters.sort(function (a, b) { return a.order - b.order});
            this.document.querySelector('#mastersGrid').innerHTML='';
            
            for (let i = 0; i < Masters.length; i++) {
                const master = Masters[i];
                console.log(master)
                let div=this.document.createElement('div');
                div.classList.add('master-card');
                div.innerHTML=(`
                   <div class="card-header">
                    <img src="${master.image}" alt="${master.name} - ${master.title}" class="master-image">
                    <img src="${master.organizationLogo}" alt="${master.title}" class="organization-logo">
                </div>
                <div class="card-body">
            
                    <h2 class="master-name"><a href="${master.goto ? master.OrganizationLink : ('/grand-master-info/'+master.createdAt)}">${master.name} </a></h2>
                    <p class="organization"><a href="${master.OrganizationLink}">${master.title.toUpperCase()}</a></p>
                    <div class="country">
                        <span>${master.country}</span>
                    </div>
                    <div class="accent-bar"></div>
                </div>
                `);
                if (master._id === "68220964e2dee974d97b4d48") {
                    this.document.querySelector('#mastersGrid').insertAdjacentHTML(`beforeend`, '<hr style="width:100%; opacity: 20%">');
                }
                this.document.querySelector('#mastersGrid').appendChild(div);
            }
            document.getElementById('skeletonGrid').style.display = 'none';
            document.getElementById('mastersGrid').style.display = 'flex';

        }
        
    } catch (error) {
        console.error(error);
    } finally {

    }
});