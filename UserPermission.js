var isUpdate=false;
        function Save_Permission() {
            
            var Permission1 = document.getElementById("Permission").value;
            var Description = document.getElementById("Description").value;
            


            var Permissions = SecurityManager.GetAllPermissions();
            console.log(Permissions);


            
            if(!isUpdate)
            {
                for (var i = 0; i < Permissions.length; i++) {
                    if (Permissions[i].Role === Permission1) {
                        alert("Permission already exists.");
                        return;
                    }
                }
            }
            
            if(isUpdate)
            {
              const userObj = {
                ID : currentUser.ID,
                Permission : Permission1,
                Description: Description,
            };

            SecurityManager.SavePermission(userObj, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllPermissions();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
            else{
              const userObj1 = {
                ID : -1,
                Permission : Permission1,
                Description: Description,
                
            };

            SecurityManager.SavePermission(userObj1, function(user) {
          console.log('User saved:', user);

        
        }, function(error) {
          console.error('Error saving user:', error);
        });
        const getuser = SecurityManager.GetAllPermissions();
        for(var i=0 ; i<getuser.length;i++)
        {
            console.log(getuser[i]);
        }
            }
        }

       
        refreshPermissionGrid();

function refreshPermissionGrid() {
  const userGrid = document.getElementById('Permission-grid');
  const users = SecurityManager.GetAllPermissions(); 
  console.log(users);
  const userGridHTML = generateUserGridHTML(users);
  
  userGrid.innerHTML = userGridHTML;
}

function handleDeleteButtonClick(userId) {
  const confirmed = confirm('Are you sure you want to Delete this User?');
  if (confirmed) {
    SecurityManager.DeletePermission(userId); 
    refreshPermissionGrid(); 
  }
}


function handleUpdateButtonClick(userId) {
  
  const Permissions = SecurityManager.GetAllPermissions();
  console.log("Hello" , Permissions);
  const userToUpdate = Permissions.find((user) => user.ID === userId);


  document.getElementById('Permission').value = userToUpdate.Permission;
  document.getElementById('Description').value = userToUpdate.Description;
  

  

  currentUser = userToUpdate;
  isUpdate=true;
}


function generateUserGridHTML(Permissions) {
  let tableHTML = '<table><thead><tr><th>ID</th><th>Permission Name</th><th>Description</th><th>Update</th><th>Delete</th></tr></thead><tbody>';

  for (const Permission of Permissions) {
    const userId = Permission.ID;
    const UserPermission = Permission.Permission;
    const UserDescription = Permission.Description;
    const editButton = `<button class="Update-Button" onclick="handleUpdateButtonClick(${userId},${true})">Edit</button>`;
    const deleteButton = `<button class="Delete-Button" onclick="handleDeleteButtonClick(${userId})">Delete</button>`;
    const action1 = `${editButton} `;
    const action2= `${deleteButton}`;

    tableHTML += `<tr><td>${userId}</td><td>${UserPermission}</td><td>${UserDescription}</td><td>${action1}</td><td>${action2}</td></tr>`;
  }

  tableHTML += '</tbody></table>';

  return tableHTML;
}
