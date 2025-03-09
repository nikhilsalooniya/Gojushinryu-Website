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
            this.document.querySelector('#mastersGrid').innerHTML='';
            
            for (let i = 0; i < Masters.length; i++) {
                const master = Masters[i];
                let div=this.document.createElement('div');
                div.classList.add('master-card');
                div.innerHTML=(`
                   <div class="card-header">
                    <img src="${master.image}" alt="${master.name} - ${master.title}" class="master-image">
                    <img src="${master.organizationLogo}" alt="${master.title}" class="organization-logo">
                </div>
                <div class="card-body">
            
                    <h2 class="master-name"><a href="${'/grand-master-info/'+master.createdAt}">${master.name} </a></h2>
                    <p class="organization"><a href="${master.OrganizationLink}">${master.title}</a></p>
                    <div class="country">
                        <span>${master.country}</span>
                    </div>
                    <div class="accent-bar"></div>
                </div>
                `);
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