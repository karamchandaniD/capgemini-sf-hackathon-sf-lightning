# capgemini-sf-hackathon-sf-lightning

# Brief
The Challenge is quite interesting and with lightning implementation enhance the awesomeness.
I liked and loved the do this challenge as their are many ways to do this.

# Feature/Requirements
The following problems are being solved as described among three modules:
* A Lightning component that will basically divided in two section
    * First half section will show list of Account record
    * Second half section will show detail of selected Account record that is being selected from First section.
* A Lightning component that will show list Account records and have following button/links and features and should be reflect the changes to Account list automatically.
    * At the top  
        * New Button : User can able to create a new Account record
    * Links with Each record
        * Edit: Clicking on this A pop up will appear and user can able to Edit record
        * Delete: By clicking on this user can able to delete that record
* A Lightning Component that will show a list Account records and have following buttons at the top
    * Update Account Source: This will also user to update Account Source of multiple selected records.
    * Delete: This will also user to delete multiple selected records.

# Technology
* Build this inside the salesforce using lightning standards

# Solution Architecture
As we have common things with all the requirements so build a single base Lightning component using via Lightning App.
* Used Lightning-Data-Service(LDS) to improve the performance and speed up.
* Less Apex interaction to avoid waiting of server response.
* Used standard Lightning tags.
* Only a single Lightning event is being used for communication between components
* Also done Test cases with some details/comments.
