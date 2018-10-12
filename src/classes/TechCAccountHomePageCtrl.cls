/**
 * @author Dharmendra Karamchandani
 * @date 2018-10-11
 * @className TechCAccountHomePageCtrl 
 **/
 public class TechCAccountHomePageCtrl {
    /**
     * @author Dharmendra Karamchandani
     * @date 2018-10-11
     * @methodName getInitData
     * @return List<Account> upto 500 records in the acesding order of Name
     **/
    @AuraEnabled
    public static List<Account> getInitData(){
        
        return [SELECT Id, Name, AccountNumber, OwnerId, Owner.Name, AccountSource, AnnualRevenue, Type, 
                CreatedById, CreatedBy.Name, LastModifiedById, Industry, Description, Phone, Fax 
                FROM Account
                ORDER BY Name
                LIMIT 500
                ];
    }
    /**
     * @author Dharmendra Karamchandani
     * @date 2018-10-11
     * @methodName getAccount
     * @param accId: the actual AccountId
     * @return List<Account> of mtaching records 
     **/
    @AuraEnabled
    public static List<Account> getAccount(String accId){
        
        return [SELECT Id, Name, AccountNumber, OwnerId, Owner.Name, AccountSource, AnnualRevenue, Type, 
                CreatedById, CreatedBy.Name, LastModifiedById, Industry, Description, Phone, Fax 
                FROM Account
                WHERE Id =:accId
                ];
    }
    /**
     * @author Dharmendra Karamchandani
     * @date 2018-10-11
     * @methodName setAccountSource
     * @param accIds: the actual Account's Id whot AccountSource will be update with 
     * @param accSource value
     **/
    @AuraEnabled
    public static void setAccountSource(List<String> accIds, String accSource){
        List<Account> accounts = new List<Account>();
        for(String accId : accIds){
            accounts.add(new Account(Id =accId, AccountSource = accSource));
        }
        if(!accounts.isEmpty()){
            update accounts;
        }
    }
    
    /**
     * @author Dharmendra Karamchandani
     * @date 2018-10-11
     * @methodName deleteAccount
     * @param accIds: the actual Account's Id those will be delete
     * @param accSource value
     **/
    @AuraEnabled
    public static void deleteAccount(List<String> accIds){
        List<Account> accounts = new List<Account>();
        for(String accId : accIds){
            accounts.add(new Account(Id = accId));
        }
        if(!accounts.isEmpty()){
            delete accounts;
        }
    }
}