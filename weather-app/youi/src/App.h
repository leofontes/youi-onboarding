#ifndef _APP_H_
#define _APP_H_

#include <signal/YiSignalHandler.h>
#include <youireact/ReactNativePlatformApp.h>

class App
    : public yi::react::PlatformApp
{
public:
    App();

    virtual ~App();

protected:
    virtual bool UserInit() override;
    virtual bool UserStart() override;
    virtual void UserUpdate() override;
    virtual void DoSetupAssetLocatorConfiguration() override;    

private:
};

#endif // _APP_H_
