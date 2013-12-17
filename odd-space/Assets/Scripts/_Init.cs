using UnityEngine;
using System.Collections;

public class _Init : MonoBehaviour
{
    void Awake()
    {
        /* Windows Phone */
#if UNITY_WP8
        Debug.Log("W: " + Screen.width + " - H: " + Screen.height);
        Screen.SetResolution(Screen.width, Screen.height, true);
#endif

        /* OUYA */
//        Screen.SetResolution(1920, 1080, true);
//        OuyaSDK.OuyaJava.JavaSetResolution("1920x1080");
    }

    void Start()
    {
    }

    void Update()
    {
    }
}