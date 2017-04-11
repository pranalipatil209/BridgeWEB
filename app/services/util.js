/**
 * Service methods for engineer page
 *@define service
 *@param {string} utilService - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').service('utilService', function () {

  /*
  *Sorting data according to alphabetical order by name
  */
  this.sortingByName = function (data) {
    dataAll = data.data.employeeList;
    //dataAll  sortBy employeename
    dataAll.sort(function (a, b) {
      var nameA = a.employeeName.toUpperCase(); // ignore upper and lowercase
      var nameB = b.employeeName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    console.log(dataAll);

    return dataAll;
  };

  /*
  *Creating section according to alphabetical order
  */
  this.createSection = function (dataAll) {
    //changing json format
    //according to name data is stored...
    var profile = {};
    dataAll.forEach(function (element) {
      var name = element.employeeName.toUpperCase();

      var id = name.charAt(0);
      if (!(profile[id] && profile[id].length)) {
        profile[id] = [];
      }
      profile[id].push(element);
    });
    console.log(profile);
    return profile;
  }

  /*
  *Filltering profile According data obtained from Search Form
  */
  this.filltering = function (data, filters) {
    var results = data;
    for (var key in filters) {
      var profile = results;
      if (filters[key] != "") {
        results = [];
        profile.forEach(function (element) {
          if (element[key].toUpperCase() == filters[key].toUpperCase()) {
            results.push(element);
          }
        })
      }
    }
    console.log(results);
    return results;

  }

});
