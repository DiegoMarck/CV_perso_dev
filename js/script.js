$(function() {
    $(".navbar a, footer a").on("click", function(event){
        event.preventDefault();
        var hash = this.hash;

        $('body').animate({scrollTop: $(hash).offset.top},  900, function(){window.location.hash = hash;})
    });
    
    // Calculer l'âge dynamiquement
    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
    
    // Mettre à jour l'âge dans la page
    const birthdate = '1975-01-15'; // Format: YYYY-MM-DD
    const age = calculateAge(birthdate);
    $('.autre p').html($('.autre p').html().replace('47 ans', age + ' ans'));
    
    // Variables pour la navbar
    let lastScrollTop = 0;
    const navbar = $('.navbar');
    const navbarHeight = navbar.outerHeight();
    let scrollTimer = null;
    
    // Fonction pour gérer l'affichage/masquage de la navbar
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        
        // Masquer la navbar lors du défilement vers le bas
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            navbar.css('top', -navbarHeight + 'px');
        } 
        // Afficher la navbar lors du défilement vers le haut
        else if (scrollTop < lastScrollTop) {
            navbar.css('top', '0');
        }
        
        lastScrollTop = scrollTop;
        
        // Réinitialiser le timer à chaque défilement
        clearTimeout(scrollTimer);
        
        // Définir un nouveau timer pour afficher la navbar après l'arrêt du défilement
        scrollTimer = setTimeout(function() {
            navbar.css('top', '0');
        }, 800); // Délai avant réapparition (800ms)
    });
    
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        $('.comments').empty();
        var postdata = $('#contact-form').serialize();
        
        $.ajax({
            type: 'POST',
            url: 'php/contact.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                 
                if(json.isSuccess) 
                {
                    $('#contact-form').append("<p class='thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>");
                    $('#contact-form')[0].reset();
                }
                else
                {
                    $('#firstname + .comments').html(json.firstnameError);
                    $('#name + .comments').html(json.nameError);
                    $('#email + .comments').html(json.emailError);
                    $('#phone + .comments').html(json.phoneError);
                    $('#message + .comments').html(json.messageError);
                }                
            }
        });
    });
})