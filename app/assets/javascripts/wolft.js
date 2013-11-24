function Navbar() {
  this.content = $('#maincontent')
}

Navbar.prototype = {
  call: function(id){
    $(id).on('click', function(e){
      e.preventDefault()

      $(id).bind('ajax:success', function(e, data, xhr, settings){
        $('#maincontent').fadeOut(function(){
          $('#maincontent').html(data)
          $('#maincontent').fadeIn()
        })
      })
    })
  }
}

function TForm() {
}

TForm.prototype = {
  updateQty: function(){
    $('#maincontent').on('change', '#tshirt_size', function(e){
      e.preventDefault()
      shirt = this
      $data = $(this).closest('form').serialize()

      $.ajax({
        type: 'get',
        url: '/show_stock',
        data: $data
      }).done(function(data){
        qty = $(shirt).parent().next().children('#tshirt_qty')
        qty.html('option')

        $.each(data, function(){
          qty.append($("<option />").val(this).text(this))
        })
      }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown)
      })
    })
  }
}

tForm = new TForm()
nav = new Navbar()

$(document).ready(function(){
  nav.call('#about')
  nav.call('#inventory')
  nav.call('#feature')
  nav.call('#basket')

  tForm.updateQty()
})
