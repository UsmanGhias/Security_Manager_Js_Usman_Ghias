var isUpdate=false;
        function Save_User()
        {
            
         var login1 = document.getElementById("login").value;
            var password1 = document.getElementById("password").value;
         var name1 = document.getElementById("name").value;
        var email1 = document.getElementById("email").value;
         var country1 = document.getElementById("country").value;
            var city1 = document.getElementById("city").value;

        var regex = /\d/;
            if(regex.test(name1)) {
                alert("name cannot contain numbers.");
                return false;
            }

            var users = SecurityManager.GetAllUsers();

            
            if(!isUpdate)
            {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].login === login1) {
                        alert("Login already exists.");
                        return;
                    }
                    if (users[i].email === email1) {
                        alert("Email already exists.");
                        return;
                    }
                }
            }
            
 if(isUpdate)
            {
     const userObj = {
                ID : currentUser.ID,
                login : login1,
                password: password1,
                name: name1,
                email: email1,
                country:country1,
                city:city1
            };

     SecurityManager.SaveUser(userObj, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllUsers();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
            else{
              const userObj1 = {
                ID : -1,
                login : login1,
                password: password1,
                name: name1,
                email: email1,
                country:country1,
                city:city1
            };

            SecurityManager.SaveUser(userObj1, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllUsers();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
        }

       
refreshUserGrid();

function refreshUserGrid() {
  const userGrid = document.getElementById('user-grid');
  const users = SecurityManager.GetAllUsers(); 
  console.log(users);
  const userGridHTML = generateUserGridHTML(users);
  
  userGrid.innerHTML = userGridHTML;
}

function handleDeleteButtonClick(userId) {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    SecurityManager.DeleteUser(userId); 
    refreshUserGrid(); 
  }
}


function handleUpdateButtonClick(userId) {
  
  const users = SecurityManager.GetAllUsers();
  const userToUpdate = users.find((user) => user.ID === userId);


  document.getElementById('name').value = userToUpdate.name;
  document.getElementById('email').value = userToUpdate.email;
  document.getElementById('login').value = userToUpdate.login;
  document.getElementById('password').value=userToUpdate.password;
  document.getElementById('country').value=userToUpdate.country;
  document.getElementById('city').value=userToUpdate.city;

  

  currentUser = userToUpdate;
  isUpdate=true;
}



function generateUserGridHTML(users) {
  let tableHTML = '<table><thead><tr><th>ID</th><th>Login</th><th>Email</th><th>Update</th><th>Delete</th></tr></thead><tbody>';

  for (const user of users) {
    const userId = user.ID;
    const userLogin = user.login;
    const userEmail = user.email;
    const editButton = `<button class="Update-Button" onclick="handleUpdateButtonClick(${userId},${true})">Edit</button>`;
    const deleteButton = `<button class="Delete-Button" onclick="handleDeleteButtonClick(${userId})">Delete</button>`;
    const action1 = `${editButton} `;
    const action2= `${deleteButton}`;

    tableHTML += `<tr><td>${userId}</td><td>${userLogin}</td><td>${userEmail}</td><td>${action1}</td><td>${action2}</td></tr>`;
  }

  tableHTML += '</tbody></table>';

  return tableHTML;
}
