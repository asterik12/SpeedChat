
function randomvalue(){
    const result = Math.random().toString(36).substring(2,5);
    const result2 = Math.random().toString(36).substring(2,6);
    const result3 = Math.random().toString(36).substring(2,5);

    document.getElementById('getRandom').innerHTML = `
  
    <p class="meeting-body">${result}-${result2}-${result3}</p>
    
    `;
}
function CopyToClipboard(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      alert("Text copied, now paste in the Meeting ID")
    }
  }
  