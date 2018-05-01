chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg === 'url-update') {
        initPage();
    }
});

function initPage(){
  // chrome.storage.sync.clear()
  chrome.storage.sync.get('removed', function(obj){
    if(obj.removed){
      obj.removed.forEach(function(element){
        console.log(element);
        $('div[data-job-id=' + element + ']').closest('li').remove();
      })
    }
  });

  $('.job-card-search__upper-content-wrapper-left').each(function(){
    addRemoveIcon($(this));
  });

  $('.remove-job-icon').each(function(){
    addRemoveIconEvent($(this));
  });

  $('.jobs-search-results__list').on('DOMNodeInserted', function(element){
      if($(element.target).hasClass('card-list__item')){
        if($(element.target).find('.remove-job-icon').length === 0 && 
          $(element.target).find('.job-card-search__upper-content-wrapper-left').length === 1){
          addRemoveIcon($(element.target).find('.job-card-search__upper-content-wrapper-left'));
          addRemoveIconEvent($(element.target).find('.remove-job-icon'));
        }
      }
  });

  function addRemoveIcon(element){
    element.after('<div class="remove-job-icon"></div>');
  }

  function addRemoveIconEvent(element){
    element.click(function(){
      const parent = $(this).closest('li > div');
      
      chrome.storage.sync.get('removed', function(obj){
        let removed = obj.removed;

        if(!removed){
          removed = [];
        }

        removed.push(parent.attr('data-job-id'));
        chrome.storage.sync.set({'removed': removed});
      })

      parent.closest('li').remove();
    })
  }
}

initPage();