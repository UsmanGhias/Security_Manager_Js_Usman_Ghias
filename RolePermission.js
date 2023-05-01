var isUpdate=false;
        function Save_RolePermission() {
            
            var Role1 = document.getElementById("Role").value;
            var Permission1 = document.getElementById("Permission").value;
            
            if(isUpdate)
            {
              const userObj = {
                ID : currentUser.ID,
                Role:Role1,
                Permission:Permission1
            };

            SecurityManager.SaveRolePermission(userObj, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllRolePermissions();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
            else{
              const userObj1 = {
                ID : -1,
                Role:Role1,
                Permission:Permission1
            };

            SecurityManager.SaveRolePermission(userObj1, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllRolePermissions();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
        }

       
RefreshRolePermissionGrid();

function RefreshRolePermissionGrid() {
  const userGrid = document.getElementById('Role-Permission-grid');
  const users = SecurityManager.GetAllRolePermissions(); 
  console.log(users);
  const userGridHTML = generateUserGridHTML(users);
  
  userGrid.innerHTML = userGridHTML;
}

function handleDeleteButtonClick(userId) {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    SecurityManager.DeleteRolePermission(userId); 
    RefreshRolePermissionGrid(); 
  }
}


function handleUpdateButtonClick(userId) {
  
  const users = SecurityManager.GetAllRolePermissions();
  const userToUpdate = users.find((user) => user.ID === userId);

  document.getElementById('Role').value=userToUpdate.Role;
  document.getElementById('Permission').value=userToUpdate.Permission;

  

  currentUser = userToUpdate;
  isUpdate=true;
}



function generateUserGridHTML(users) {
  let tableHTML = '<table><thead><tr><th>ID</th><th>Login</th><th>Email</th><th>Update</th><th>Delete</th></tr></thead><tbody>';

  for (const user of users) {
    const userId = user.ID;
    const userLogin = user.Role;
    const userEmail = user.Permission;
    const editButton = `<button class="Update-Button" onclick="handleUpdateButtonClick(${userId},${true})">Edit</button>`;
    const deleteButton = `<button class="Delete-Button" onclick="handleDeleteButtonClick(${userId})">Delete</button>`;
    const action1 = `${editButton} `;
    const action2= `${deleteButton}`;

    tableHTML += `<tr><td>${userId}</td><td>${userLogin}</td><td>${userEmail}</td><td>${action1}</td><td>${action2}</td></tr>`;
  }

  tableHTML += '</tbody></table>';

  return tableHTML;
}
