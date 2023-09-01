    console.log("connected!")
    let newdiv="";
    let foundimg="";
    let viewbtn="";
    let linkcopier="";
    const inputlink=document.querySelector("#inputlink");
    document.querySelector("#mainbtn").addEventListener("click",()=>{
        const URL= document.querySelector("#inputlink").value
        getData(URL)
        document.querySelector('.title-container').style.display = 'block'
        
        setTimeout(function(){
            document.querySelector('.title-container').style.display = 'none'
        }, 2500);

    })

          const getData = async (URL) => {
               
               try {
                await axios
                    .get(`/.netlify/functions/getusers?name=${URL}`)
                    .then((response) => {
                        let parser = new DOMParser()
                        let doc = parser.parseFromString(response.data, 'text/html')
                        document.querySelector('#images').innerHTML=""
                        let scripts = doc.getElementsByTagName('img')
                        var i = scripts.length;
                        setTimeout(() => {
                                 for(let x=0;x<scripts.length;x++){
                                newdiv = document.createElement('div')
                                newdiv.setAttribute('class','newdiv')
                                foundimg=document.createElement('img')
                                foundimg.setAttribute('class','foundimgs')
                                foundimg.src=scripts[x].src
                                newdiv.appendChild(foundimg)
                                document.querySelector('#images').appendChild(newdiv)
                           //downloader
                                let downloadbtn=document.createElement('button');
                                downloadbtn.setAttribute('class','downloadbtn')
                                downloadbtn.innerHTML="<iconify-icon icon=\"akar-icons:download\" width=\"16\"></iconify-icon>"
                                newdiv.appendChild(downloadbtn)
                                let downloadersrc=foundimg.src;
                                downloadbtn.addEventListener("click",()=>{
                                    let imagePath = downloadersrc;
                                    let fileName = 'safeimagekit-extract-pic';
                                    saveAs(imagePath, fileName);
                                })
                           //image expander
                        //         viewbtn=document.createElement('button');
                        //         newdiv.appendChild(viewbtn);
                        //         viewbtn.addEventListener('click',imgviewer)
                                let copylink
                                copylink=document.createElement('button');
                                copylink.setAttribute('class','copybtn')
                                copylink.innerHTML="<iconify-icon icon=\"fa-regular:copy\" width=\"16\" height=\"16\"></iconify-icon>"
                                newdiv.appendChild(copylink);
                                copylink.addEventListener('click',()=>{
                                    notify();
                                    var copyText = document.createElement('input');
                                    copyText.setAttribute('type','text')
                                    document.body.appendChild(copyText)
                                    copyText.value=downloadersrc;
                                    copyText.select();
                                    document.execCommand("copy");
                                    copyText.remove();
                                });    
                            }
                          }, 2000);

                    } )
                }
                catch (error) {
                        console.log(error)
                }
        }
        
        function downloader(downloadersrc){
            console.log("downloading!")
                let url = downloadersrc
                console.log(url)
                let a = document.createElement('a')
                a.href = url
                a.download = `safeimagekit-extract-pics`
                document.body.appendChild(a)
                a.click()
                a.remove()
                console.log("downloading!")
            
        }
        function notify(){
            setTimeout(function(){
                document.getElementById('notificationcopied').style.display = 'block'
            }, 500);
            
            setTimeout(function(){
                document.getElementById('notificationcopied').style.display = 'none'
            }, 900);
        }
