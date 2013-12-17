using UnityEngine;
using System.Collections;

public class exit : MonoBehaviour
{
	void Start ()
    {
	
	}

	void Update ()
    {	
	}

    void OnTriggerEnter(Collider collider)
    {
        if (collider.tag.Equals("Player"))
        {
            if (Application.loadedLevel < Application.levelCount-1)
            {
                Application.LoadLevel(Application.loadedLevel + 1);
            }
            else
            {
                Application.LoadLevel(2);
            }
        }
    }
}
