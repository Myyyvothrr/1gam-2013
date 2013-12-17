using UnityEngine;
using System.Collections;

public class killzone : MonoBehaviour
{
    void Start()
    {
    }

    void Update()
    {
    }

    void OnTriggerEnter(Collider collider)
    {
        if (collider.tag.Equals("Player"))
        {
            collider.SendMessage("killed");
        }
    }
}
