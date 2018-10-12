/**
 * @author Dharmendra Karamchandani
 * @date 2018-10-11
 * @className TechCTestFuel 
 * @description: Used as Utility class for test cases
 **/
@isTest 
public class TechCTestFuel {
    /**
     * @author Dharmendra Karamchandani
     * @date 2018-10-11
     * @methodName getInitData
     * @return List<Account> for testing
     **/
    public Account[] accounts{
        get {
            if(accounts == NULL) {
                accounts = new List<Account>();
                for(Integer ind = 1; ind < 11; ind++){
                    accounts.add(new Account(Name = 'Test Account Name '+ind));
                }
                insert accounts;
            }
            return accounts;
        }
        set;
    }
}