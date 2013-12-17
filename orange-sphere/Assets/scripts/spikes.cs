using UnityEngine;
using System.Collections;

public class spikes : MonoBehaviour
{
	void Start ()
    {	
	}
	
	void Update ()
    {
	}

    void OnCollisionEnter(Collision collision)
    {
        if (collision.collider.tag.Equals("Player"))
        {
            collision.collider.SendMessage("killed");
        }
    }
}
