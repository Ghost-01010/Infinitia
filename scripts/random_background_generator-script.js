let container = document.querySelector('.container');
          for (var i=0; i<=80; i++){
            let blocks = document.createElement('div');
            blocks.classList.add('block');
            container.appendChild(blocks);
           } 

           function circle(){
            let circleBtn = document.querySelector('.circleBtn');
            container.classList.toggle('circle');
           }

           function generate(){
            anime({
                targets : '.block',
                translateX : function(){
                    return anime.random(-700,700);
                },
                translateY : function(){
                    return anime.random(-500,500);
                },
                scale : function(){
                    return anime.random(1,5);
                }
            })
           }

           generate()