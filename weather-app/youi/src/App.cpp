#include "App.h"

#include <JSBundlingStrings.h>
#include <automation/YiWebDriverLocator.h>
#include <cxxreact/JSBigString.h>
#include <glog/logging.h>
#include <platform/YiDeviceBridgeLocator.h>

// Native Modules
#if (YI_CLOUD_SERVER)
  #include <YiCloudConfigModule.h>
#endif
#include <YiCloudModule.h>
#include "TrackpadModule.h"
#include "OrientationLockModule.h"
#include "RefUtilsModule.h"

App::App() = default;

App::~App() = default;

using namespace yi::react;

bool App::UserInit()
{
    // Start the web driver for allowing the use of Appium.
    CYIWebDriver *pWebDriver = CYIWebDriverLocator::GetWebDriver();
    if (pWebDriver)
    {
        pWebDriver->Start();
    }

#if !defined(YI_MINI_GLOG)
    // miniglog defines this using a non-const char * causing a compile error and it has no implementation anyway.
    static bool isGoogleLoggingInitialized = false;
    if (!isGoogleLoggingInitialized)
    {
        google::InitGoogleLogging("--logtostderr=1");
        isGoogleLoggingInitialized = true;
    }
#endif

    std::unique_ptr<JsBundleLoader> pBundleLoader(GetBundler());

    PlatformApp::SetJsBundleLoader(std::move(pBundleLoader));

    bool b_platformInit = PlatformApp::UserInit();
    GetReactNativeViewController().AddModule<Cloud>();
    GetReactNativeViewController().AddModule<TrackpadModule>();
    GetReactNativeViewController().AddModule<OrientationLockModule>();
    GetReactNativeViewController().AddModule<RefUtilsModule>();

    #if (YI_CLOUD_SERVER)
        GetReactNativeViewController().AddModule<CloudConfig>();
    #endif

    return b_platformInit;
}

bool App::UserStart()
{
    return PlatformApp::UserStart();
}

void App::UserUpdate()
{
    PlatformApp::UserUpdate();
}

void App::DoSetupAssetLocatorConfiguration()
{
    auto *pDeviceBridge = CYIDeviceBridgeLocator::GetDeviceTypeBridge();
    if (pDeviceBridge)
    {
        if (pDeviceBridge->GetDeviceType() == CYIDeviceTypeBridge::Type::Desktop)
        {
            // spoof desktop as `tv` for dev purposes
            SetupAssetLocatorConfiguration("TV");
        }

        if (pDeviceBridge->GetDeviceType() == CYIDeviceTypeBridge::Type::Tablet)
        {
            // spoof desktop as `tv` for dev purposes
            SetupAssetLocatorConfiguration("TV");
            AssetLocatorConfiguration::GetInstance().SetupAssetLocatorConfiguration("tv");
        }
    }
}
