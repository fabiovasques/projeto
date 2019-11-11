$(document).ready(function() {
  // tooltip
  $('[data-toggle="tooltip"]').tooltip();
  // datatable
  $('.table').DataTable();
});

function addNoticia(){            
  window.location.href = '/admin/noticias/adicionar';
}

function cancelNoticia(){  
  window.location.href = '/admin';
}