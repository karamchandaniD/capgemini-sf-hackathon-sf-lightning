/**
 * @author Dharmendra Karamchandani
 * @date 2018-10-11
 * @className TechCAccountHomePageCtrlTest 
 * @description This test class to test the scenarios of TechCAccountHomePageCtrl
 **/
@isTest
public class TechCAccountHomePageCtrlTest {
    /**
     * @author Dharmendra Karamchandani
     * @date 2018-10-11
     * @methodName testTechCAccountHomePageCtrl
     **/
    @isTest 
    static void testTechCAccountHomePageCtrl(){
        TechCTestFuel tFuel = new TechCTestFuel();
        List<Account> accounts  = tFuel.accounts;
        
        Test.startTest();
            List<Account> allAccounts = TechCAccountHomePageCtrl.getInitData();
            System.assertEquals(accounts.size(), allAccounts.size());
            
            List<Account> idAccount = TechCAccountHomePageCtrl.getAccount(accounts[accounts.size()-1].Id);
            System.assertEquals(accounts[accounts.size()-1].Name, idAccount[0].Name);
            
            System.assertEquals(0, [SELECT Count() FROM Account WHERE AccountSource ='Web']);
            TechCAccountHomePageCtrl.setAccountSource(new List<String>{accounts[0].Id,accounts[1].Id}, 'Web');
            
            System.assertEquals(accounts.size(), [SELECT Count() FROM Account ]);
            TechCAccountHomePageCtrl.deleteAccount(new List<String>{accounts[2].Id,accounts[3].Id});
        Test.stopTest();
        // only update two records with AccoutnSource
        System.assertEquals(2, [SELECT Count() FROM Account WHERE AccountSource ='Web']);
        //deleted two records
        System.assertEquals(accounts.size()-2, [SELECT Count() FROM Account ]);
    }
}