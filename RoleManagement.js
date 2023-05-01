var isUpdate=false;
        function Save_Role() {
            
            var Role1 = document.getElementById("Role").value;
            var Description = document.getElementById("Description").value;
            


            var Roles = SecurityManager.GetAllRoles();
            console.log(Roles);

            
            if(!isUpdate)
            {
                for (var i = 0; i < Roles.length; i++) {
                    if (Roles[i].Role === Role1) {
                        alert("Role already exists.");
                        return;
                    }
                }
            }
            
            if(isUpdate)
            {
              const userObj = {
                ID : currentUser.ID,
                Role : Role1,
                Description: Description,
            };

            SecurityManager.SaveRole(userObj, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllRoles();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
            else{
              const userObj1 = {
                ID : -1,
                Role : Role1,
                Description: Description,
                
            };

            SecurityManager.SaveRole(userObj1, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllRoles();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
        }

       
        refreshRoleGrid();

function refreshRoleGrid() {
  const userGrid = document.getElementById('Role-grid');
  const users = SecurityManager.GetAllRoles(); 
  console.log(users);
  const userGridHTML = generateUserGridHTML(users);
  
  userGrid.innerHTML = userGridHTML;
}

function handleDeleteButtonClick(userId) {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    SecurityManager.DeleteRole(userId); 
    refreshRoleGrid(); 
  }
}


function handleUpdateButtonClick(userId) {
  
  const users = SecurityManager.GetAllRoles();
  console.log("helllo" , users);
  const userToUpdate = users.find((user) => user.ID === userId);


  document.getElementById('Role').value = userToUpdate.Role;
  document.getElementById('Description').value = userToUpdate.Description;
  

  

  currentUser = userToUpdate;
  isUpdate=true;
}


function generateUserGridHTML(users) {
  let tableHTML = '<table><thead><tr><th>ID</th><th>Role Name</th><th>Description</th><th>Update</th><th>Delete</th></tr></thead><tbody>';

  for (const user of users) {
    const userId = user.ID;
    const UserRole = user.Role;
    const UserDescription = user.Description;
    const editButton = `<button class="Update-Button" onclick="handleUpdateButtonClick(${userId},${true})">Edit</button>`;
    const deleteButton = `<button class="Delete-Button" onclick="handleDeleteButtonClick(${userId})">Delete</button>`;
    const action1 = `${editButton} `;
    const action2= `${deleteButton}`;

    tableHTML += `<tr><td>${userId}</td><td>${UserRole}</td><td>${UserDescription}</td><td>${action1}</td><td>${action2}</td></tr>`;
  }

  tableHTML += '</tbody></table>';

  return tableHTML;
}
