# =============================================================================
# © You i Labs Inc. 2000-2019. All rights reserved.
#
# This file is used to list out the resource files used by the platform to be able
# to set the application icons or other platform specific settings.
#
# To set up your own list of resources, copy this file into your project's
# 'cmake/Modules/<platform>' folder. The file must be named the same as it
# appears in its current form for the build system to pick it up for use instead
# of the file that ships with the engine.
#
# Within the project's CMakeLists.txt file, make sure the `CMAKE_MODULE_PATH`
# has the path to your project's `cmake` directory listed first. Then add the following
# line to the CMakeLists.txt file.
#
# include(Modules/${YI_PLATFORM_LOWER}/YiPlatformResources)
#
if(__yi_platform_resources_included)
    return()
endif()
set(__yi_platform_resources_included 1)

set(YI_PLATFORM_RESOURCES_IOS
    ${CMAKE_CURRENT_SOURCE_DIR}/Resources/ios/AppIcon.xcassets
    ${CMAKE_CURRENT_SOURCE_DIR}/Resources/ios/LaunchScreen.png
    ${CMAKE_CURRENT_SOURCE_DIR}/Resources/ios/LaunchScreen.storyboard
    ${CMAKE_CURRENT_SOURCE_DIR}/Resources/ios/OriginalAppIcon.png
)
